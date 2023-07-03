import { useState } from "react";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import { useRouter } from "next/router";
import { getEnvironment } from "@contexts/Environment";
import { CompilerType } from "@api/types";
import { useGetVerificationConfigQuery } from "@store/contract";
import { DropdownOptionsI } from "@components/commons/Dropdown";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";

const sleep = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

export default function VerifyContract() {
  const router = useRouter();
  const queryAddress = router.query.address;
  const [address, setAddress] = useState((queryAddress as string) ?? "");

  const defaultDropdownValue: DropdownOptionsI = { label: "", value: "" };
  const [compiler, setCompiler] =
    useState<DropdownOptionsI>(defaultDropdownValue);
  const [version, setVersion] =
    useState<DropdownOptionsI>(defaultDropdownValue);
  const [license, setLicense] =
    useState<DropdownOptionsI>(defaultDropdownValue);
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
    setLicense(defaultDropdownValue);
    setIsTermsChecked(false);
    setAddress("");
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
    if (compiler.value !== value.value) {
      setVersion(defaultDropdownValue);
    }
    const versions = getCompilerVersions(value.value);
    setCompilerVersions(versions);
  };

  return (
    <div>
      <StepOne
        compiler={compiler}
        version={version}
        address={address}
        license={license}
        isTermsChecked={isTermsChecked}
        setIsTermsChecked={setIsTermsChecked}
        reset={resetStepOne}
        setAddress={setAddress}
        setCompiler={handleCompilerSelect}
        compilerVersions={compilerVersions}
        setVersion={setVersion}
        setLicense={setLicense}
        isEditing={isEditStepOne}
        setIsEditing={(isEditing: boolean) => setIsEditStepOne(isEditing)}
        onSubmit={() => setIsEditStepOne(false)}
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
          submitForm={submitForm}
          isVerifying={isVerifying}
          isVerified={isVerified}
          evmVersions={getEvmVersions()}
          error={error}
          hasOptimization={hasOptimization}
          setHasOptimization={(hasOpt: boolean) => setHasOptimization(hasOpt)}
          sourceCode={sourceCode}
          setSourceCode={(sourceCodeData: string) =>
            setSourceCode(sourceCodeData)
          }
          constructorArgs={constructorArguments}
          setConstructorArgs={(constructorArgs: string) =>
            setConstructorArguments(constructorArgs)
          }
          evmVersion={evmVersion}
          setEvmVersion={setEvmVersion}
          optimizationRuns={optimizationRuns}
          setOptimizationRuns={(optRuns: number) =>
            setOptimizationRuns(optRuns)
          }
        />
      )}
    </div>
  );
}
