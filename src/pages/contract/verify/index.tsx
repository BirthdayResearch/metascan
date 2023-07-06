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

const initialLibraryValues: { [key: string]: string } = {
  library1Name: "",
  library1Address: "",
  library2Name: "",
  library2Address: "",
  library3Name: "",
  library3Address: "",
  library4Name: "",
  library4Address: "",
  library5Name: "",
  library5Address: "",
  library6Name: "",
  library6Address: "",
  library7Name: "",
  library7Address: "",
  library8Name: "",
  library8Address: "",
  library9Name: "",
  library9Address: "",
  library10Name: "",
  library10Address: "",
};

export default function VerifyContract() {
  const router = useRouter();
  const queryAddress = router.query.address;
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
      pathname: `/contract/${address}`,
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
    formData.append(
      "external_libraries[library1_name]",
      libraryValues.library1Name
    );
    formData.append(
      "external_libraries[library1_address]",
      libraryValues.library1Address
    );
    formData.append(
      "external_libraries[library2_name]",
      libraryValues.library2Name
    );
    formData.append(
      "external_libraries[library2_address]",
      libraryValues.library2Address
    );
    formData.append(
      "external_libraries[library3_name]",
      libraryValues.library3Name
    );
    formData.append(
      "external_libraries[library3_address]",
      libraryValues.library3Address
    );
    formData.append(
      "external_libraries[library4_name]",
      libraryValues.library4Name
    );
    formData.append(
      "external_libraries[library4_address]",
      libraryValues.library4Address
    );
    formData.append(
      "external_libraries[library5_name]",
      libraryValues.library5Name
    );
    formData.append(
      "external_libraries[library5_address]",
      libraryValues.library5Address
    );
    formData.append(
      "external_libraries[library6_name]",
      libraryValues.library6Name
    );
    formData.append(
      "external_libraries[library6_address]",
      libraryValues.library6Address
    );
    formData.append(
      "external_libraries[library7_name]",
      libraryValues.library7Name
    );
    formData.append(
      "external_libraries[library7_address]",
      libraryValues.library7Address
    );
    formData.append(
      "external_libraries[library8_name]",
      libraryValues.library8Name
    );
    formData.append(
      "external_libraries[library8_address]",
      libraryValues.library8Address
    );
    formData.append(
      "external_libraries[library9_name]",
      libraryValues.library9Name
    );
    formData.append(
      "external_libraries[library9_address]",
      libraryValues.library9Address
    );
    formData.append(
      "external_libraries[library10_name]",
      libraryValues.library10Name
    );
    formData.append(
      "external_libraries[library10_address]",
      libraryValues.library10Address
    );
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
