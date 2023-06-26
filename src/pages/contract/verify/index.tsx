import { useState } from "react";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import { useRouter } from "next/router";
import { getEnvironment } from "@contexts/Environment";
import { ContractLanguage } from "@api/types";
import StepOne, { StepOneDetailsI } from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";

export default function VerifiedContract() {
  // todo add validations
  const defaultDropdownValue = { label: "", value: "" };
  const redirectionDelay = 3000;
  const defaultOptimizationRuns = 200;
  const [optimization, setOptimization] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [constructorArguments, setConstructorArguments] = useState("");
  const [optimizationRuns, setOptimizationRuns] = useState<number>(
    defaultOptimizationRuns
  );
  const [editStepOne, setEditStepOne] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [stepOneDetails, setStepOneDetails] = useState<StepOneDetailsI>({
    address: "",
    compiler: "",
    version: "",
    license: "",
  });

  const { connection } = useNetwork();
  const router = useRouter();

  const networkQuery = !getEnvironment().isDefaultConnection(connection)
    ? { network: connection }
    : {};

  const evmVersions = [
    { label: "Default (compiler defaults)", value: "london" },
    { label: "homestead (oldest version)", value: "homestead" },
    { label: "tangerineWhistle", value: "tangerineWhistle" },
    { label: "spuriousDragon", value: "spuriousDragon" },
    { label: "byzantium (default for <= v0.5.4)", value: "byzantium" },
    { label: "constantinople", value: "constantinople" },
    { label: "petersburg (default for >= v0.5.5)", value: "petersburg" },
    { label: "istanbul (default for >= v0.5.14)", value: "istanbul" },
    { label: "berlin", value: "berlin" },
  ];

  const [evmVersion, setEvmVersion] = useState(evmVersions[0]);

  const onSubmitStepOne = (data) => {
    setStepOneDetails(data);
    setEditStepOne(false);
  };

  const submitForm = async () => {
    setIsVerifying(true);
    const data = {
      addressHash: stepOneDetails.address,
      compilerVersion: stepOneDetails.version,
      contractSourceCode: sourceCode,
      optimization,
      name: "",
      // for Solidity contract
      ...(stepOneDetails.contractLanguage === ContractLanguage.Solidity && {
        evmVersion: evmVersion.value,
        optimizationRuns,
        constructorArguments,
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
    setOptimization(false);
    setSourceCode("");
    setConstructorArguments("");
    setOptimizationRuns(defaultOptimizationRuns);
    setIsVerifying(false);
    setIsVerified(false);
    setError("");
    setEvmVersion(evmVersions[0]);
  };

  return (
    <div>
      <StepOne
        isEditing={editStepOne}
        setIsEditing={setEditStepOne}
        onSubmit={onSubmitStepOne}
        defaultDropdownValue={defaultDropdownValue}
      />
      {!editStepOne && (
        <StepTwo
          stepOneDetails={stepOneDetails}
          reset={resetStepTwo}
          submitForm={submitForm}
          isVerifying={isVerifying}
          isVerified={isVerified}
          evmVersions={evmVersions}
          error={error}
          optimization={optimization}
          setOptimization={setOptimization}
          sourceCode={sourceCode}
          setSourceCode={setSourceCode}
          constructorArguments={constructorArguments}
          setConstructorArguments={setConstructorArguments}
          evmVersion={evmVersion}
          setEvmVersion={setEvmVersion}
          optimizationRuns={optimizationRuns}
          setOptimizationRuns={setOptimizationRuns}
        />
      )}
    </div>
  );
}
