import { useState } from "react";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import { useRouter } from "next/router";
import { getEnvironment } from "@contexts/Environment";
import { ContractLanguage } from "@api/types";
import { useGetVerificationConfigQuery } from "@store/contract";
import StepOne, { StepOneDetailsI } from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";

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

  const getCompilerVersions = (
    language: ContractLanguage
  ): {
    label: string;
    value: string;
  }[] => {
    let builds: string[];
    if (language === ContractLanguage.Solidity) {
      builds = verificationConfig?.solidity_compiler_versions ?? [];
    } else {
      builds = verificationConfig?.vyper_compiler_versions ?? [];
    }
    return builds.map((build) => ({
      label: build,
      value: build,
    }));
  };

  const getEvmVersions = (): {
    label: string;
    value: string;
  }[] => {
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

  const submitForm = async () => {
    setIsVerifying(true);
    const data = {
      addressHash: stepOneDetails.address,
      compilerVersion: stepOneDetails.version,
      contractSourceCode: sourceCode,
      hasOptimization,
      name: "",
      // for Solidity contract
      ...(stepOneDetails.contractLanguage === ContractLanguage.Solidity && {
        evmVersion: evmVersion.value,
        optimizationRuns,
        constructorArguments,
        autodetectConstructorArguments: constructorArguments === "",
      }),
    };
    const res = await SmartContractApi.verifySmartContract(
      connection,
      data,
      stepOneDetails.contractLanguage as ContractLanguage
    );
    setIsVerifying(false);
    if (res.result) {
      setIsVerified(true);
      setTimeout(() => {
        router.push({
          pathname: `/contract/${stepOneDetails.address}`,
          query: networkQuery,
        });
      }, redirectionDelay);
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
