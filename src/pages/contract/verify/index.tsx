import { useState } from "react";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import Dropdown from "@components/commons/Dropdown";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import clsx from "clsx";
import SmartContractApi from "@api/SmartContractApi";
import { SCVersionsBuilds } from "@api/types";
import InputComponent from "@components/commons/InputComponent";

enum ContractLanguage {
  Solidity = "Solidity",
  Vyper = "Vyper",
}

export default function VerifiedContract() {
  // todo add validations
  const router = useRouter();
  const queryAddress = router.query.address;
  const [address, setAddress] = useState((queryAddress as string) ?? "");
  const defaultValue = { label: "", value: "" };
  const [compiler, setCompiler] = useState(defaultValue);
  const [version, setVersion] = useState(defaultValue);
  const [license, setLicense] = useState(defaultValue);
  const [terms, setTerms] = useState(false);
  const [compilerVersions, setCompilerVersions] = useState<
    { label: string; value: string }[]
  >([]);

  const getSmartContractVersions = async (language) => {
    let builds: SCVersionsBuilds[];
    if (language === ContractLanguage.Solidity) {
      const versionsRes = await SmartContractApi.getSolidityVersions();
      builds = versionsRes.builds.reverse();
    } else {
      const versionsRes = await SmartContractApi.getVyperVersions();
      builds = versionsRes.builds;
    }
    setCompilerVersions(
      builds.map((each) => ({
        label: each.longVersion,
        value: each.longVersion,
      }))
    );
  };

  const types = [
    {
      label: "Solidity (Single file)",
      value: "Solidity (Single file)",
      type: ContractLanguage.Solidity,
    },
    {
      label: "Solidity (Multi-Part files)",
      value: "Solidity (Multi-Part files)",
      type: ContractLanguage.Solidity,
    },
    {
      label: "Solidity (Standard-Json-Input)",
      value: "Solidity (Standard-Json-Input)",
      type: ContractLanguage.Solidity,
    },
    {
      label: "Vyper (Experimental)",
      value: "Vyper (Experimental)",
      type: ContractLanguage.Vyper,
    },
  ];

  const licenseTypes = [
    { label: "No License (None)", value: "No License (None)" },
    { label: "The Unlicense (Unlicense)", value: "The Unlicense (Unlicense)" },
    { label: "MIT License (MIT)", value: "MIT License (MIT)" },
    {
      label: "GNU General Public License v2.0 (GNU GPLv2)",
      value: "GNU General Public License v2.0 (GNU GPLv2)",
    },
    {
      label: "GNU General Public License v3.0 (GNU GPLv3)",
      value: "GNU General Public License v3.0 (GNU GPLv3)",
    },
    {
      label: "GNU Lesser General Public License v2.1 (GNU LGPLv2.1)",
      value: "GNU Lesser General Public License v2.1 (GNU LGPLv2.1)",
    },
    {
      label: "GNU Lesser General Public License v3.0 (GNU LGPLv3)",
      value: "GNU Lesser General Public License v3.0 (GNU LGPLv3)",
    },
    {
      label: "BSD 2-clause &quot;Simplified&quot; license (BSD-2-Clause)",
      value: "BSD 2-clause &quot;Simplified&quot; license (BSD-2-Clause)",
    },
    {
      label:
        "BSD 3-clause &quot;New&quot; Or &quot;Revised&quot; license (BSD-3-Clause)",
      value:
        "BSD 3-clause &quot;New&quot; Or &quot;Revised&quot; license (BSD-3-Clause)",
    },
    {
      label: "Mozilla Public License 2.0 (MPL-2.0)",
      value: "Mozilla Public License 2.0 (MPL-2.0)",
    },
    {
      label: "Open Software License 3.0 (OSL-3.0)",
      value: "Open Software License 3.0 (OSL-3.0)",
    },
    { label: "Apache 2.0 (Apache-2.0)", value: "Apache 2.0 (Apache-2.0)" },
    {
      label: "GNU Affero General Public License (GNU AGPLv3)",
      value: "GNU Affero General Public License (GNU AGPLv3)",
    },
    {
      label: "Business Source License (BSL 1.1)",
      value: "Business Source License (BSL 1.1)",
    },
  ];

  const reset = () => {
    setCompiler(defaultValue);
    setVersion(defaultValue);
    setLicense(defaultValue);
    setTerms(false);
    setAddress("");
  };
  return (
    <div className="px-1 md:px-0 mt-12 w-full lg:w-8/12">
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
          give users an opportunity to audit the code to independently verify.
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
            setValue={setAddress}
            placeholder="0x…"
          />
          <Dropdown
            value={compiler}
            label="Compiler"
            placeholder="Select compiler"
            options={types}
            onChange={(value) => {
              setCompiler(value);
              getSmartContractVersions(value.type);
            }}
          />
          <Dropdown
            value={version}
            label="Compiler version"
            placeholder="Select compiler version"
            options={compilerVersions}
            onChange={setVersion}
          />
          <Dropdown
            value={license}
            label="Open Source License type"
            placeholder="Select license type"
            options={licenseTypes}
            onChange={setLicense}
          />

          <div className="flex flex-col lg:flex-row items-center justify-between pt-8">
            <div className="flex flex-row items-center mb-8 lg:mb-0">
              <button
                type="button"
                className="flex flex-row items-center"
                onClick={() => setTerms(!terms)}
              >
                {terms ? (
                  <IoMdCheckmarkCircle size={18} className="text-green-800" />
                ) : (
                  <MdRadioButtonUnchecked size={18} className="text-white-50" />
                )}
                <span className="text-white-50 ml-2 mr-1">I agree to the</span>
              </button>
              <a
                target="_blank"
                data-testid="terms-of-service"
                href="/contract/verify/terms"
                className="text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300"
              >
                terms of service
              </a>
            </div>
            <ContinueBtn
              label="Continue"
              testId="continue"
              // disabled
              customStyle="w-full md:w-3/6 lg:w-2/6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContinueBtn({
  onClick,
  disabled,
  label,
  testId,
  customStyle,
}: {
  label: string;
  testId: string;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
}) {
  return (
    <button
      data-testid={`${testId}-button`}
      type="button"
      className={clsx(
        "flex items-center justify-center rounded-[40px] group border border-white-50 py-5",
        "hover:bg-white-300 bg-white-50",
        { "opacity-[0.3]": disabled },
        customStyle
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={clsx(
          "text-black-900 font-semibold tracking-[0.02em] text-xl"
        )}
      >
        {label}
      </span>
    </button>
  );
}
