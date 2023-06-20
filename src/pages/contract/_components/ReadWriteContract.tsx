import { ContractMethodType, SmartContractMethod } from "@api/types";
import Button from "../../../components/commons/Button";
import ContractMethod from "./read-write/ContractMethod";

export default function ReadWriteContract({
  type,
  title,
  methods,
}: {
  type: ContractMethodType;
  title: string;
  methods: SmartContractMethod[];
}) {
  return (
    <div className="text-white-50">
      <div className="flex flex-row items-center">
        <div className="flex flex-grow text-white-50 font-bold text-xl mt-[42.5px] md:mb-[39.5px] mb-[47.5px]">
          {title}
        </div>
        <Button
          label="Clear data"
          testId="write-contract-clear-input-button"
          size="small"
          onClick={() => {
            // TODO: Handle form reset
          }}
        />
      </div>
      {methods?.map((item, index) => (
        <ContractMethod
          key={item.method_id}
          type={type}
          method={item}
          index={index}
        />
      ))}
    </div>
  );
}
