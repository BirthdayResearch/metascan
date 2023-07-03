import { useState } from "react";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import { useRouter } from "next/router";
import { getEnvironment } from "@contexts/Environment";
import { CompilerType } from "@api/types";
import StepOne, { StepOneDetailsI } from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";

const sleep = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

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
  // const [selectedFiles, setSelectedFiles] = useState([])
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
    { label: "default", value: "default" },
    { label: "paris", value: "paris" },
    { label: "london", value: "london" },
    { label: "berlin", value: "berlin" },
    { label: "istanbul", value: "istanbul" },
    { label: "petersburg", value: "petersburg" },
    { label: "constantinople", value: "constantinople" },
    { label: "byzantium", value: "byzantium" },
    { label: "spuriousDragon", value: "spuriousDragon" },
    { label: "tangerineWhistle", value: "tangerineWhistle" },
    { label: "homestead", value: "homestead" },
  ];

  const [evmVersion, setEvmVersion] = useState(evmVersions[0]);

  const onSubmitStepOne = (data) => {
    setStepOneDetails(data);
    setEditStepOne(false);
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
      data.append("optimization", `${optimization}`);
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
      optimization,
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
