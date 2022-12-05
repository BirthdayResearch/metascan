import { useState } from "react";
import Button from "../../../components/commons/Button";
import WriteContractRowItem, { WriteData } from "./WriteContractRowItem";

export default function WriteContract({
  writeContractData,
}: {
  writeContractData: WriteData[];
}) {
  const [isClearDataClicked, setIsClearDataClicked] = useState(false);
  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="flex flex-grow text-white-50 font-bold text-xl mt-[42.5px] md:mb-[39.5px] mb-[47.5px]">
          {fixedTitle.writeContract}
        </div>
        <Button
          label="Clear data"
          testId="write-contract-clear-input-button"
          size="small"
          onClick={() => {
            setIsClearDataClicked(true);
          }}
        />
      </div>
      {writeContractData.map((item, index) => (
        <WriteContractRowItem
          key={item.parentid}
          rowItem={item}
          itemIndex={index}
          length={writeContractData.length}
          isClearDataClicked={isClearDataClicked}
          setIsClearDataClicked={setIsClearDataClicked}
        />
      ))}
    </div>
  );
}

const fixedTitle = {
  writeContract: "Write contract",
};
