import { useState } from "react";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import { useRouter } from "next/router";
import { getEnvironment } from "@contexts/Environment";
import { CompilerType, ContractLanguage } from "@api/types";
import { useGetVerificationConfigQuery } from "@store/contract";
import StepOne, { StepOneDetailsI } from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";

interface CompilerVersions {
  [ContractLanguage.Solidity]: {
    label: string;
    value: string;
  }[];
  [ContractLanguage.Vyper]: {
    label: string;
    value: string;
  }[];
}

const sleep = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

export default function VerifiedContract() {
  // todo add validations
  const defaultDropdownValue = { label: "", value: "" };
  const redirectionDelay = 3000;
  const defaultOptimizationRuns = 200;
  const [hasOptimization, setHasOptimization] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [constructorArguments, setConstructorArguments] = useState("");
  const [optimizationRuns, setOptimizationRuns] = useState<number>(
    defaultOptimizationRuns
  );
  const [isEditStepOne, setIsEditStepOne] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // const [selectedFiles, setSelectedFiles] = useState([])
  const [error, setError] = useState("");
  const [stepOneDetails, setStepOneDetails] = useState<StepOneDetailsI>({
    address: "",
    compiler: "",
    version: "",
    license: "",
  });
  const [evmVersion, setEvmVersion] = useState(defaultDropdownValue);

  const { connection } = useNetwork();
  const router = useRouter();

  const networkQuery = !getEnvironment().isDefaultConnection(connection)
    ? { network: connection }
    : {};
  const { data: verificationConfig } = useGetVerificationConfigQuery({
    network: connection,
  });

  const compilerVersions: CompilerVersions = {
    [ContractLanguage.Solidity]: (
      verificationConfig?.solidity_compiler_versions ?? []
    ).map((version) => ({ label: version, value: version })),
    [ContractLanguage.Vyper]: (
      verificationConfig?.vyper_compiler_versions ?? []
    ).map((version) => ({ label: version, value: version })),
  };
  const getCompilerVersions = (language: ContractLanguage) =>
    compilerVersions[language];

  const getEvmVersions = () => {
    const versions = verificationConfig?.solidity_evm_versions ?? [];
    return [...versions].reverse().map((version) => ({
      label: version,
      value: version,
    }));
  };

  const onSubmitStepOne = (data: StepOneDetailsI): void => {
    setStepOneDetails(data);
    setIsEditStepOne(false);
  };

  const redirect = async () => {
    await sleep(redirectionDelay);
    router.push({
      pathname: `/contract/${stepOneDetails.address}`,
      query: networkQuery,
    });
  };

  const submitForm = async () => {
    setIsVerifying(true);
    // for standard input json
    if (stepOneDetails.compiler === CompilerType.SolidityStandardJsonInput) {
      const data = new FormData();
      data.append("codeformat", "solidity-standard-json-input");
      data.append("sourceCode", sourceCode);
      data.append("contractaddress", stepOneDetails.address);
      data.append("compilerversion", stepOneDetails.version);
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
      addressHash: stepOneDetails.address,
      compilerVersion: stepOneDetails.version,
      contractSourceCode: sourceCode,
      hasOptimization,
      name: "",
      // for Solidity contract
      ...(stepOneDetails.compiler !== CompilerType.Vyper && {
        evmVersion: evmVersion.value,
        optimizationRuns,
        constructorArguments,
        autodetectConstructorArguments: constructorArguments === "",
      }),
    };
    const res = await SmartContractApi.verifySmartContract(
      connection,
      data,
      stepOneDetails.compiler as CompilerType
    );
    setIsVerifying(false);
    if (res.status === "1" && res.result === "Pass - Verified") {
      setIsVerified(true);
      await redirect();
    } else {
      setError(res.message);
      setIsVerified(false);
    }
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

  return (
    <div>
      <StepOne
        isEditing={isEditStepOne}
        setIsEditing={(isEditing: boolean) => setIsEditStepOne(isEditing)}
        onSubmit={onSubmitStepOne}
        defaultDropdownValue={defaultDropdownValue}
        getCompilerVersions={getCompilerVersions}
      />
      {!isEditStepOne && (
        <StepTwo
          stepOneDetails={stepOneDetails}
          reset={resetStepTwo}
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
          setEvmVersion={({ label, value }: { label: string; value: string }) =>
            setEvmVersion({ label, value })
          }
          optimizationRuns={optimizationRuns}
          setOptimizationRuns={(optRuns: number) =>
            setOptimizationRuns(optRuns)
          }
        />
      )}
    </div>
  );
}
