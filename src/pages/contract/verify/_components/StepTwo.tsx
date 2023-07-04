import clsx from "clsx";
import Switch from "@components/commons/Switch";
import InputComponent from "@components/commons/InputComponent";
import Dropdown, { DropdownOptionsI } from "@components/commons/Dropdown";
import { FiLoader, FiSlash } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import DisclosureComponent from "@components/commons/Disclosure";
import { CompilerType } from "@api/types";
import { ActionButton } from "./StepOne";

interface StepTwoProps {
  address: string;
  version: DropdownOptionsI;
  compiler: DropdownOptionsI;
  reset: () => void;
  resetAll: () => void;
  submitForm: () => Promise<void>;
  isVerifying: boolean;
  isVerified: boolean;
  evmVersions: DropdownOptionsI[];
  error: string;
  hasOptimization: boolean;
  setHasOptimization: (hasOptimization: boolean) => void;
  sourceCode: string;
  setSourceCode: (sourceCode: string) => void;
  constructorArgs: string;
  setConstructorArgs: (constructorArgs: string) => void;
  evmVersion: DropdownOptionsI;
  setEvmVersion: (value: DropdownOptionsI) => void;
  optimizationRuns: number;
  setOptimizationRuns: (optimizationRuns: number) => void;
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

export default function StepTwo({
  reset,
  resetAll,
  submitForm,
  isVerifying,
  isVerified,
  address,
  version,
  compiler,
  evmVersions,
  error,
  hasOptimization,
  setHasOptimization,
  sourceCode,
  setSourceCode,
  constructorArgs,
  setConstructorArgs,
  evmVersion,
  setEvmVersion,
  optimizationRuns,
  setOptimizationRuns,
}: StepTwoProps) {
  const isDisabled = () => {
    if (
      address === "" ||
      version.value === "" ||
      sourceCode === "" ||
      isVerifying
    ) {
      return true;
    }
    return false;
  };

  return (
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
              {compiler.value === CompilerType.SoliditySingleFile && (
                <>
                  <div className="mt-12 p-4 md:p-6 border-[0.5px] border-white-900 rounded-[10px]">
                    <div className="flex flex-row items-center mb-4">
                      <div className="font-semibold text-white-50 text-lg -tracking-[0.02em] mr-4">
                        Optimization enabled
                      </div>
                      <Switch
                        enabled={hasOptimization}
                        onClick={() => setHasOptimization(!hasOptimization)}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-5">
                      <div className="md:w-1/3">
                        <InputComponent
                          type="number"
                          label="Runs"
                          showClearIcon={false}
                          disabled={!hasOptimization}
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
                  <div className="mt-12 p-4 md:p-6 border-[0.5px] border-white-900 rounded-[10px]">
                    <div className="mb-4">
                      <DisclosureComponent
                        title="Constructor Arguments"
                        subtitle="(for contracts that were created with constructor parameters)"
                      >
                        <div className="mt-6 md:pl-10 md:pr-4">
                          <textarea
                            data-testid="constructor-argument"
                            className={clsx(
                              "w-full focus:outline-none h-[112px] transition-opacity rounded-md font-space-mono tracking-[-0.04em] break-all bg-dark-100 border-[0.5px] border-dark-200 text-white-50 py-[18px] px-4 resize-y placeholder-black-500"
                            )}
                            placeholder=""
                            onChange={(e) => setConstructorArgs(e.target.value)}
                            value={constructorArgs}
                          />
                        </div>
                      </DisclosureComponent>
                    </div>
                    {/* <div className="pt-4 border-t border-white-50">
                      <DisclosureComponent
                        title="Contract Library Address"
                        subtitle="(for contracts that use libraries, supports up to 10)"
                      >
                        <div className="mt-6 md:pl-10 md:pr-4">
                          Contract Library Address
                        </div>
                      </DisclosureComponent>
                    </div> */}
                  </div>
                </>
              )}
              <div className="flex flex-col-reverse lg:space-y-0 lg:flex-row lg:space-x-12 mt-8 md:mt-16 w-full">
                <div className="flex flex-col md:flex-row md:space-x-4 w-full lg:w-1/2 space-y-4 md:space-y-0 mt-4 md:mt-6 lg:mt-0">
                  <ActionButton
                    label="Reset"
                    disabled={isVerifying}
                    testId="submit-verify-contract"
                    onClick={reset}
                    customStyle="border-[0.5px] border-white-50 !bg-transparent w-full lg:w-5/12"
                    labelStyle="text-white-50"
                  />
                  <ActionButton
                    label="Return to main"
                    disabled={isVerifying}
                    testId="submit-verify-contract"
                    onClick={resetAll}
                    customStyle="border-[0.5px] border-white-50 !bg-transparent w-full lg:w-7/12"
                    labelStyle="text-white-50"
                  />
                </div>
                <ActionButton
                  label="Submit"
                  testId="submit-verify-contract"
                  onClick={submitForm}
                  disabled={isDisabled()}
                  customStyle="w-full lg:w-1/2"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
