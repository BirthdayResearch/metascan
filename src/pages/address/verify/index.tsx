import { useState } from "react";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import { useRouter } from "next/router";
import { getEnvironment } from "@contexts/Environment";
import { CompilerType } from "@api/types";
import { useGetVerificationConfigQuery } from "@store/contract";
import { DropdownOptionsI } from "@components/commons/Dropdown";
import WalletAddressApi from "@api/WalletAddressApi";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";

const sleep = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

const initialLibraryValues: { [key: string]: string } = [...Array(10)].reduce(
  (obj, _current, currentIndex) => ({
    ...obj,
    [`library${currentIndex + 1}Name`]: "",
    [`library${currentIndex + 1}Address`]: "",
  }),
  {}
);
export default function VerifyContract() {
  const router = useRouter();
  const queryAddress = router.query.cid;
  const [address, setAddress] = useState((queryAddress as string) ?? "");
  const [libraryValues, setLibraryValues] = useState<{ [key: string]: string }>(
    initialLibraryValues
  );

  const defaultDropdownValue: DropdownOptionsI = { label: "", value: "" };
  const [compiler, setCompiler] =
    useState<DropdownOptionsI>(defaultDropdownValue);
  const [version, setVersion] =
    useState<DropdownOptionsI>(defaultDropdownValue);
  // Do not remove, will be implemented in next phase
  // const [license, setLicense] =
  //   useState<DropdownOptionsI>(defaultDropdownValue);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const redirectionDelay = 3000;
  const defaultOptimizationRuns = 200;
  const [hasOptimization, setHasOptimization] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [constructorArguments, setConstructorArguments] = useState("");
  const [optimizationRuns, setOptimizationRuns] = useState<number>(
    defaultOptimizationRuns
  );
  const [compilerVersions, setCompilerVersions] = useState<DropdownOptionsI[]>(
    []
  );
  const [isEditStepOne, setIsEditStepOne] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [evmVersion, setEvmVersion] = useState(defaultDropdownValue);

  const { connection } = useNetwork();
  const networkQuery = !getEnvironment().isDefaultConnection(connection)
    ? { network: connection }
    : {};
  const { data: verificationConfig } = useGetVerificationConfigQuery({
    network: connection,
  });

  const getCompilerVersions = (language) => {
    if (language === CompilerType.Vyper) {
      return (verificationConfig?.vyper_compiler_versions ?? []).map((v) => ({
        label: v,
        value: v,
      }));
    }
    return (verificationConfig?.solidity_compiler_versions ?? []).map((v) => ({
      label: v,
      value: v,
    }));
  };

  const getEvmVersions = () => {
    const versions = (verificationConfig?.solidity_evm_versions ?? [])
      .map((v) => ({
        label: v,
        value: v,
      }))
      .reverse();
    if (evmVersion.value === "" && versions.length) {
      setEvmVersion(versions[0]);
    }
    return versions;
  };

  const redirect = async () => {
    await sleep(redirectionDelay);
    router.push({
      pathname: `/address/${address}`,
      query: networkQuery,
    });
  };

  const [files, setFiles] = useState<File[]>([]);
  const submitUsingMultiPartFile = async () => {
    // Create an object of formData
    const formData = new FormData();
    formData.append("verification_type", "multi-part-files");
    formData.append("smart_contract[address_hash]", address);
    formData.append("smart_contract[nightly_builds]", "false");
    formData.append("smart_contract[compiler_version]", version.value);
    formData.append("smart_contract[evm_version]", evmVersion.value);
    formData.append("smart_contract[optimization]", `${hasOptimization}`);
    formData.append("smart_contract[optimization_runs]", `${optimizationRuns}`);
    // Append 10 libraries
    for (let i = 1; i <= 10; i += 1) {
      formData.append(
        `external_libraries[library${i}_name]`,
        libraryValues[`library${i}Name`]
      );
      formData.append(
        `external_libraries[library${i}_address]`,
        libraryValues[`library${i}Address`]
      );
    }

    for (let i = 0; i < files?.length; i += 1) {
      formData.append(`file[${i}]`, files[i]);
    }
    await SmartContractApi.verifySmartContractUsingMultiPartFile(
      connection,
      formData
    );
    await sleep(2000);
    const details = await WalletAddressApi.getDetail(connection, address);
    setIsVerifying(false);
    if (details.is_verified) {
      setIsVerified(true);
      await redirect();
    } else {
      setError("Error occurred while verifying smart contract");
      setIsVerified(false);
    }
  };

  const submitForm = async () => {
    try {
      setIsVerifying(true);
      // for standard input json
      if (compiler.value === CompilerType.SolidityStandardJsonInput) {
        const data = new FormData();
        data.append("codeformat", "solidity-standard-json-input");
        data.append("sourceCode", sourceCode);
        data.append("contractaddress", address);
        data.append("compilerversion", version.value);
        data.append("optimizationRuns", `${optimizationRuns}`);
        data.append("optimization", `${hasOptimization}`);
        data.append("contractname", "");
        const res = await SmartContractApi.verifySmartContractUsingJSONInput(
          connection,
          data
        );
        await sleep(2000);
        const verificationStatus = await SmartContractApi.checkVerifyStatus(
          connection,
          res.result
        );
        setIsVerifying(false);
        if (
          verificationStatus.status === "1" &&
          verificationStatus.result === "Pass - Verified"
        ) {
          setIsVerified(true);
          await redirect();
        } else {
          setError(verificationStatus.result);
          setIsVerified(false);
        }
        return;
      }

      // for multi part file
      if (compiler.value === CompilerType.SolidityMultiPartFiles) {
        await submitUsingMultiPartFile();
        return;
      }

      // for solidity single file and vyper contract verification
      const data = {
        addressHash: address,
        compilerVersion: version.value,
        contractSourceCode: sourceCode,
        optimization: hasOptimization,
        name: "",
        // for Solidity single file verification
        ...(compiler.value === CompilerType.SoliditySingleFile && {
          evmVersion: evmVersion.value,
          optimizationRuns,
          constructorArguments,
          autodetectConstructorArguments: constructorArguments === "",
          ...libraryValues,
        }),
      };
      const res = await SmartContractApi.verifySmartContract(
        connection,
        data,
        compiler.value as CompilerType
      );
      setIsVerifying(false);
      if (res.status === "1") {
        setIsVerified(true);
        await redirect();
      } else {
        setError(res.message);
        setIsVerified(false);
      }
    } catch (err) {
      setError(
        "An error occurred while verifying the smart contract. Please try again."
      );
      setIsVerifying(false);
      setIsVerified(false);
    }
  };

  const resetStepOne = () => {
    setCompiler(defaultDropdownValue);
    setVersion(defaultDropdownValue);
    setIsTermsChecked(false);
    setAddress("");
    // Do not remove, will be implemented in next phase
    // setLicense(defaultDropdownValue);
  };

  const resetStepTwo = () => {
    setHasOptimization(false);
    setSourceCode("");
    setConstructorArguments("");
    setOptimizationRuns(defaultOptimizationRuns);
    setIsVerifying(false);
    setIsVerified(false);
    setError("");
    setEvmVersion(defaultDropdownValue);
  };

  const handleCompilerSelect = (value): void => {
    setCompiler(value);
    const versions = getCompilerVersions(value.value);
    const isVersionAvailable = versions.find(
      (item) => version.value === item.value
    );
    if (!isVersionAvailable) {
      setVersion(defaultDropdownValue);
    }
    setCompilerVersions(versions);
  };

  return (
    <div>
      <StepOne
        compiler={compiler}
        version={version}
        address={address}
        isTermsChecked={isTermsChecked}
        setIsTermsChecked={setIsTermsChecked}
        reset={resetStepOne}
        setAddress={setAddress}
        setCompiler={handleCompilerSelect}
        compilerVersions={compilerVersions}
        setVersion={setVersion}
        isEditing={isEditStepOne}
        setIsEditing={(isEditing: boolean) => setIsEditStepOne(isEditing)}
        onSubmit={() => setIsEditStepOne(false)}
        // Do not remove, will be implemented in next phase
        // license={license}
        // setLicense={setLicense}
      />
      {!isEditStepOne && (
        <StepTwo
          address={address}
          version={version}
          compiler={compiler}
          reset={resetStepTwo}
          resetAll={() => {
            resetStepOne();
            resetStepTwo();
            setIsEditStepOne(true);
          }}
          files={files}
          setFiles={setFiles}
          submitForm={submitForm}
          isVerifying={isVerifying}
          isVerified={isVerified}
          evmVersions={getEvmVersions()}
          error={error}
          hasOptimization={hasOptimization}
          setHasOptimization={setHasOptimization}
          sourceCode={sourceCode}
          setSourceCode={setSourceCode}
          constructorArgs={constructorArguments}
          setConstructorArgs={setConstructorArguments}
          evmVersion={evmVersion}
          setEvmVersion={setEvmVersion}
          optimizationRuns={optimizationRuns}
          setOptimizationRuns={setOptimizationRuns}
          libraryValues={libraryValues}
          setLibraryValues={setLibraryValues}
        />
      )}
    </div>
  );
}
