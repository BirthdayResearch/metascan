import { FiArrowLeft } from "react-icons/fi";
import { useState, useEffect } from "react";
import Dropdown, { DropdownOptionsI } from "@components/commons/Dropdown";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import clsx from "clsx";
import { useRouter } from "next/router";
import { CompilerType } from "@api/types";
import InputComponent from "@components/commons/InputComponent";
import WalletAddressApi from "@api/WalletAddressApi";
import { useNetwork } from "@contexts/NetworkContext";

export function ActionButton({
  onClick,
  disabled,
  label,
  testId,
  customStyle,
  labelStyle,
}: {
  label: string;
  testId: string;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
  labelStyle?: string;
}) {
  return (
    <button
      data-testid={`${testId}-button`}
      type="button"
      className={clsx(
        "flex items-center justify-center rounded-[40px] group border border-white-50 py-5 bg-white-50",
        disabled ? "opacity-[0.3]" : "hover:bg-white-300",
        customStyle
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={clsx(
          "text-black-900 font-semibold -tracking-[0.01em] text-xl",
          labelStyle
        )}
      >
        {label}
      </span>
    </button>
  );
}

function ContractDetailRow({
  label,
  value,
  containerClass,
}: {
  label: string;
  value: string;
  containerClass?: string;
}) {
  return (
    <div className={clsx("flex flex-col", containerClass)}>
      <div className="text-white-700 text-sm mb-1 -tracking-[0.01em]">
        {label}
      </div>
      <div className="text-white-50 mb-1 -tracking-[0.02em] break-all">
        {value}
      </div>
    </div>
  );
}

interface StepOneProps {
  compiler: DropdownOptionsI;
  setCompiler: (value: DropdownOptionsI) => void;
  version: DropdownOptionsI;
  setVersion: (value: DropdownOptionsI) => void;
  address: string;
  setAddress: (value: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onSubmit: () => void;
  compilerVersions: DropdownOptionsI[];
  isTermsChecked: boolean;
  setIsTermsChecked: (value: boolean) => void;
  reset: () => void;
  // Do not remove, will be implemented in next phase
  // license: DropdownOptionsI;
  // setLicense: (value: DropdownOptionsI) => void;
}

export default function StepOne({
  compiler,
  setCompiler,
  version,
  setVersion,
  compilerVersions,
  address,
  setAddress,
  isEditing,
  setIsEditing,
  onSubmit,
  isTermsChecked,
  setIsTermsChecked,
  reset,
}: StepOneProps) {
  const router = useRouter();
  const { connection } = useNetwork();
  const [isVerified, setIsVerified] = useState(false);
  const types = [
    {
      label: CompilerType.SoliditySingleFile,
      value: CompilerType.SoliditySingleFile,
    },
    {
      label: CompilerType.SolidityMultiPartFiles,
      value: CompilerType.SolidityMultiPartFiles,
    },
    {
      label: CompilerType.SolidityStandardJsonInput,
      value: CompilerType.SolidityStandardJsonInput,
    },
    {
      label: CompilerType.Vyper,
      value: CompilerType.Vyper,
    },
  ];

  // Do not remove, will be implemented in next phase
  // const licenseTypes = [
  //   { label: "No License (None)", value: "No License (None)" },
  //   { label: "The Unlicense (Unlicense)", value: "The Unlicense (Unlicense)" },
  //   { label: "MIT License (MIT)", value: "MIT License (MIT)" },
  //   {
  //     label: "GNU General Public License v2.0 (GNU GPLv2)",
  //     value: "GNU General Public License v2.0 (GNU GPLv2)",
  //   },
  //   {
  //     label: "GNU General Public License v3.0 (GNU GPLv3)",
  //     value: "GNU General Public License v3.0 (GNU GPLv3)",
  //   },
  //   {
  //     label: "GNU Lesser General Public License v2.1 (GNU LGPLv2.1)",
  //     value: "GNU Lesser General Public License v2.1 (GNU LGPLv2.1)",
  //   },
  //   {
  //     label: "GNU Lesser General Public License v3.0 (GNU LGPLv3)",
  //     value: "GNU Lesser General Public License v3.0 (GNU LGPLv3)",
  //   },
  //   {
  //     label: "BSD 2-clause &quot;Simplified&quot; license (BSD-2-Clause)",
  //     value: "BSD 2-clause &quot;Simplified&quot; license (BSD-2-Clause)",
  //   },
  //   {
  //     label:
  //       "BSD 3-clause &quot;New&quot; Or &quot;Revised&quot; license (BSD-3-Clause)",
  //     value:
  //       "BSD 3-clause &quot;New&quot; Or &quot;Revised&quot; license (BSD-3-Clause)",
  //   },
  //   {
  //     label: "Mozilla Public License 2.0 (MPL-2.0)",
  //     value: "Mozilla Public License 2.0 (MPL-2.0)",
  //   },
  //   {
  //     label: "Open Software License 3.0 (OSL-3.0)",
  //     value: "Open Software License 3.0 (OSL-3.0)",
  //   },
  //   { label: "Apache 2.0 (Apache-2.0)", value: "Apache 2.0 (Apache-2.0)" },
  //   {
  //     label: "GNU Affero General Public License (GNU AGPLv3)",
  //     value: "GNU Affero General Public License (GNU AGPLv3)",
  //   },
  //   {
  //     label: "Business Source License (BSL 1.1)",
  //     value: "Business Source License (BSL 1.1)",
  //   },
  // ];

  const checkAddress = (addressValue: string): string => {
    if (addressValue.length !== 42) {
      return "Invalid Length";
    }
    if (isVerified) {
      return "Unable to proceed. Contract address entered is already verified.";
    }
    return "";
  };

  useEffect(() => {
    if (checkAddress(address) === "") {
      WalletAddressApi.getDetail(connection, address)
        .then((details) => {
          setIsVerified(details.is_verified);
        })
        .catch(() => setIsVerified(false));
    } else {
      setIsVerified(false);
    }
  }, [address]);

  const isDisabled = (): boolean => {
    if (
      checkAddress(address) !== "" ||
      compiler.value === "" ||
      version.value === "" ||
      // Do not remove, will be implemented in next phase
      // license.value === "" ||
      !isTermsChecked
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="px-1 md:px-0 mt-12">
      {isEditing ? (
        <div className="w-full lg:w-8/12">
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              type="button"
              className="flex flex-row mb-6"
            >
              <FiArrowLeft size={24} className="text-white-50" />
              <div className="font-medium ml-2 text-white-50">Back</div>
            </button>
            <div className="text-2xl md:text-[32px] font-bold text-white-50 mb-4">
              Verify & publish contract source code
            </div>
            <div className="text-base md:text-2xl text-white-700">
              A &quot;smart contract&quot; should provide end users with more
              information on what they are &quot;digitally signing&quot; for and
              give users an opportunity to audit the code to independently
              verify.
            </div>
          </div>
          <div>
            <div className="mb-[38px] text-right p-2">
              <button
                type="button"
                className="text-black-500 font-medium"
                onClick={reset}
              >
                Reset form
              </button>
            </div>
            <div className="space-y-6">
              <InputComponent
                label="Enter contract address to verify"
                value={address}
                setValue={(value: string) => setAddress(value)}
                error={checkAddress(address)}
                placeholder="0x…"
              />
              <Dropdown
                value={compiler}
                label="Compiler"
                placeholder="Select compiler"
                options={types}
                onChange={setCompiler}
              />
              <Dropdown
                value={version}
                label="Compiler version"
                placeholder="Select compiler version"
                options={compilerVersions}
                onChange={setVersion}
              />
              {/* <Dropdown
                value={license}
                label="Open Source License type"
                placeholder="Select license type"
                options={licenseTypes}
                onChange={setLicense}
              /> */}

              <div className="flex flex-col lg:flex-row items-center justify-between pt-8">
                <div className="flex flex-row items-center mb-8 lg:mb-0">
                  <button
                    type="button"
                    className="flex flex-row items-center"
                    onClick={() => setIsTermsChecked(!isTermsChecked)}
                  >
                    {isTermsChecked ? (
                      <IoMdCheckmarkCircle
                        size={18}
                        className="text-green-800"
                      />
                    ) : (
                      <MdRadioButtonUnchecked
                        size={18}
                        className="text-white-50"
                      />
                    )}
                    <span className="text-white-50 ml-2 mr-1">
                      I agree to the
                    </span>
                  </button>
                  <a
                    target="_blank"
                    data-testid="terms-of-service"
                    href="/contract/verify/terms"
                    className="text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300"
                  >
                    Terms of Service
                  </a>
                </div>
                <ActionButton
                  label="Continue"
                  testId="continue"
                  onClick={onSubmit}
                  disabled={isDisabled()}
                  customStyle="w-full md:w-3/6 lg:w-2/6"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-6 border-b-[0.5px] border-black-300">
          <div className="text-2xl md:text-[32px] font-bold text-white-50 mb-4">
            Verifying contract
          </div>
          <ContractDetailRow label="Contract address" value={address} />
          <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-5 justify-between">
            <ContractDetailRow
              containerClass="md:w-1/3"
              label="Compiler"
              value={compiler.label}
            />
            <ContractDetailRow
              containerClass="md:w-1/3"
              label="Compiler version"
              value={version.label}
            />
            {/* Do not remove, will be implemented in next phase */}
            {/* <ContractDetailRow
              containerClass="md:w-1/3"
              label="Open source license type"
              value={license.label}
            /> */}
          </div>
          <div className="mt-6 md:mt-4 py-1.5">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300 font-medium"
            >
              Edit contract details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
