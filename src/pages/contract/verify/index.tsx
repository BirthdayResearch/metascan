/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useRouter } from "next/router";
import SmartContractApi from "@api/SmartContractApi";
import { useNetwork } from "@contexts/NetworkContext";
import StepOne from "./_components/StepOne";

export default function VerifiedContract() {
  // todo add validations
  const router = useRouter();
  const defaultDropdownValue = { label: "", value: "" };

  const queryAddress = router.query.address;
  const [optimization, setOptimization] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [optimizationRuns, setOptimizationRuns] = useState("");
  const [name, setName] = useState("");
  const [stepOneDetails, setStepOneDetails] = useState({
    address: (queryAddress as string) ?? "",
    compiler: "",
    version: "",
    license: "",
  });

  const { connection } = useNetwork();

  const onSubmitStepOne = (data) => {
    setStepOneDetails(data);
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("smart_contract[address_hash]", "address");
    formData.append("smart_contract[compiler_version]", "version");
    formData.append("smart_contract[contract_source_code]", sourceCode);
    formData.append("smart_contract[is_yul]", "false");
    formData.append("smart_contract[name]", name);
    formData.append("smart_contract[nightly_builds]", "false");
    formData.append("smart_contract[evm_version]", "evmVersion.value");
    formData.append("smart_contract[optimization]", `${optimization}`);
    formData.append("smart_contract[optimization_runs]", optimizationRuns);
    formData.append("smart_contract[autodetect_constructor_args]", "true");
    formData.append("smart_contract[constructor_arguments]", "");

    formData.append("external_libraries[library1_name]", "");
    formData.append("external_libraries[library1_address]", "");
    formData.append("external_libraries[library2_name]", "");
    formData.append("external_libraries[library2_address]", "");
    formData.append("external_libraries[library3_name]", "");
    formData.append("external_libraries[library3_address]", "");
    formData.append("external_libraries[library4_name]", "");
    formData.append("external_libraries[library4_address]", "");
    formData.append("external_libraries[library5_name]", "");
    formData.append("external_libraries[library5_address]", "");
    formData.append("external_libraries[library6_name]", "");
    formData.append("external_libraries[library6_address]", "");
    formData.append("external_libraries[library7_name]", "");
    formData.append("external_libraries[library7_address]", "");
    formData.append("external_libraries[library8_name]", "");
    formData.append("external_libraries[library8_address]", "");
    formData.append("external_libraries[library9_name]", "");
    formData.append("external_libraries[library9_address]", "");
    formData.append("external_libraries[library10_name]", "");
    formData.append("external_libraries[library10_address]", "");

    const res = await SmartContractApi.verifySmartContract(
      connection,
      formData
    );
    console.log({ res });
  };

  return (
    <div>
      <StepOne
        onSubmit={onSubmitStepOne}
        defaultDropdownValue={defaultDropdownValue}
      />
    </div>
  );
}
