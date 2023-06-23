import { useState } from "react";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import clsx from "clsx";
import Switch from "@components/commons/Switch";
import InputComponent from "@components/commons/InputComponent";
import Dropdown from "@components/commons/Dropdown";
import { FiLoader, FiSlash } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/router";
import { getEnvironment } from "@contexts/Environment";
import StepOne, { ActionButton } from "./_components/StepOne";

export default function VerifiedContract() {
  // todo add validations
  const defaultDropdownValue = { label: "", value: "" };
  const redirectionDelay = 3000;
  const [optimization, setOptimization] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [optimizationRuns, setOptimizationRuns] = useState<number>(200);
  const [editStepOne, setEditStepOne] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [stepOneDetails, setStepOneDetails] = useState({
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

  const isDisabled = () => {
    if (
      stepOneDetails.address === "" ||
      stepOneDetails.version === "" ||
      sourceCode === "" ||
      isVerifying
    ) {
      return true;
    }
    return false;
  };

  const submitForm = async () => {
    setIsVerifying(true);
    const data = {
      addressHash: stepOneDetails.address,
      compilerVersion: stepOneDetails.version,
      contractSourceCode: sourceCode,
      optimization,
      name: "",
      evmVersion: "london",
      optimizationRuns,
    };
    const res = await SmartContractApi.verifySmartContract(connection, data);
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
    console.log({ res });
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
        <div className="mt-6 w-full lg:w-8/12">
          {isVerifying ? (
            <StatusComponent
              title="Verifying contract"
              subtitle="Please wait as the contract is being verified"
            >
              <FiLoader size={24} className="text-white-50 animate-spin" />
            </StatusComponent>
          ) : (
            <div>
              {isVerified ? (
                <StatusComponent
                  title="Contract verified"
                  subtitle="You will be redirected shortly to the contract detail page"
                >
                  <MdCheckCircle size={24} className="text-green-800" />
                </StatusComponent>
              ) : (
                <>
                  {error !== "" && (
                    <div className="mb-12">
                      <StatusComponent
                        title="Unable to generate"
                        subtitle="For troubleshooting, you can try compiling your source code with the Remix - Solidity IDE and check for exceptions"
                      >
                        <FiSlash size={24} className="text-red-800" />
                      </StatusComponent>
                      <div className="mt-2 text-red-800 -tracking-[0.01em] text-sm">
                        {error}
                      </div>
                    </div>
                  )}
                  <div className="font-semibold text-white-50 text-xl -tracking-[0.01em] mb-6 md:mb-4 lg:mb-6">
                    Contract code and details
                  </div>
                  <div>
                    <div className="text-lg text-white-700 -tracking-[0.02em] mb-2">
                      Enter code to verify
                    </div>
                    <textarea
                      data-testid="code"
                      className={clsx(
                        "w-full focus:outline-none h-[168px] transition-opacity rounded-md font-space-mono tracking-[-0.04em] break-all bg-dark-100 border-[0.5px] border-dark-200 text-white-50 py-[18px] px-4 resize-y placeholder-black-500"
                      )}
                      placeholder=""
                      onChange={(e) => setSourceCode(e.target.value)}
                      value={sourceCode}
                    />
                  </div>
                  <div className="mt-12 p-4 md:p-6 border-[0.5px] border-white-900 rounded-[10px]">
                    <div className="flex flex-row items-center mb-4">
                      <div className="font-semibold text-white-50 text-lg -tracking-[0.02em] mr-4">
                        Optimization enabled
                      </div>
                      <Switch
                        enabled={optimization}
                        onClick={() => setOptimization(!optimization)}
                      />
                    </div>
                    <div>
                      <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-5">
                        <div className="md:w-1/3">
                          <InputComponent
                            type="number"
                            label="Runs"
                            showClearIcon={false}
                            disabled={!optimization}
                            labelClassName="text-white-700 text-sm mb-1 -tracking-[0.01em]"
                            inputContainerClassName="!py-3"
                            inputClass="!text-sm"
                            value={optimizationRuns}
                            setValue={(value: number) =>
                              setOptimizationRuns(value)
                            }
                            error=""
                            placeholder="200"
                          />
                        </div>
                        <div className="lg:w-1/3">
                          <Dropdown
                            options={evmVersions}
                            onChange={setEvmVersion}
                            value={evmVersion}
                            dropdownContainerClassName="!py-[10px]"
                            labelClass="!text-sm"
                            label="EVM Version to target"
                            labelClassName="text-white-700 text-sm mb-1 -tracking-[0.01em]"
                            placeholder="Select compiler version"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-16">
                    <ActionButton
                      label="Submit"
                      testId="submit-verify-contract"
                      onClick={submitForm}
                      disabled={isDisabled()}
                      customStyle="w-full lg:w-5/12"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatusComponent({ title, subtitle, children }) {
  return (
    <>
      <div className="flex flex-row space-x-2 items-center">
        <div className="font-semibold text-white-50 text-xl -tracking-[0.01em]">
          {title}
        </div>
        {children}
      </div>
      <div className="text-white-50 -tracking-[0.02em] mt-2">{subtitle}</div>
    </>
  );
}
