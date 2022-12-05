import clsx from "clsx";
import { useEffect, useState } from "react";
import Button from "../../../components/commons/Button";

interface UserInputData {
  id: string;
  title: string;
  userInputValue: string;
}

export interface WriteData {
  parentid: number;
  title: string;
  summary: string;
  input: InputTitle[];
}

interface InputTitle {
  id: string;
  title: string;
}

export default function WriteContractInputItem({
  rowItem,
  itemIndex,
  length,
  isClearDataClicked,
  setIsClearDataClicked,
}) {
  const [userInput, setUserInput] = useState<WriteData[]>([]);
  const handleOnChange = (item: UserInputData, textval: string) => {
    const userInputDataArray = rowItem.inputs.map(
      (inputItem: UserInputData) => {
        const newUserInput = inputItem;
        if (newUserInput.id === item.id) {
          newUserInput.userInputValue = textval;
        }
        return newUserInput;
      }
    );
    const returnInputData = rowItem;
    returnInputData.inputs = userInputDataArray;
    setUserInput(returnInputData);
  };
  return (
    <div
      data-testid={`${rowItem.parentid}-write-contract-row`}
      className={clsx({ "md:mb-10 mb-5": itemIndex === length - 1 })}
    >
      <div
        data-testid={`${rowItem.parentid}-write-contract-title`}
        className={clsx("text-white-50 font-bold text-xl mt-[81px]", {
          "mt-0": itemIndex === 0,
        })}
      >
        {rowItem.title}
      </div>
      <div
        data-testid={`${rowItem.parentid}-write-contract-summary`}
        className="text-white-700 tracking-[0.01em] lg:w-[740px] mt-[21px]"
      >
        {rowItem.summary}
      </div>
      {rowItem.inputs.map((inputItem: UserInputData, index: number) => (
        <WriteContractInputRow
          key={inputItem.id}
          inputItem={inputItem}
          handleOnChange={handleOnChange}
          index={index}
          length={rowItem.inputs.length}
          isClearDataClicked={isClearDataClicked}
          setIsClearDataClicked={setIsClearDataClicked}
        />
      ))}
      <Button
        customStyle="ml-4"
        label="Write"
        testId={`${rowItem.parentid}-write-contract-button`}
        size="small"
        onClick={() => {
          // send data back to api
          console.log(userInput);
        }}
      />
    </div>
  );
}

function WriteContractInputRow({
  inputItem,
  handleOnChange,
  index,
  length,
  isClearDataClicked,
  setIsClearDataClicked,
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    handleOnChange(inputItem, userInput);
  }, [userInput]);

  useEffect(() => {
    if (isClearDataClicked) {
      setUserInput("");
      setIsClearDataClicked(false);
    }
  });
  return (
    <div
      data-testid={`${inputItem.id}-write-contract-user-input`}
      className={clsx(
        "flex flex-col gap-y-4 my-[72px]",
        { "mt-[52px]": index === 0 },
        { "mb-3": index === length - 1 }
      )}
    >
      <div
        data-testid={`${inputItem.id}-write-contract-user-input-title`}
        className="text-white-700 tracking-[0.01em] md:text-xl"
      >
        {inputItem.title}
      </div>

      <div
        className={clsx(
          "relative group flex w-full rounded-lg p-[0.5px] bg-black-500 focus-within:bg-lightBlue black-gradient-1-shadow backdrop-blur-[6px]",
          "transition duration-300 ease-in"
        )}
      >
        {!isFocused && (
          <div
            className={clsx(
              "absolute opacity-0 inset-0 rounded-lg transition brand-gradient-1 group-hover:opacity-100 z-[-10]",
              "transition duration-300 ease-in"
            )}
          />
        )}
        <div
          onBlur={() => {
            setIsFocused(false);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          className="flex flex-row items-center w-full h-full rounded-lg bg-black-900 black-gradient-1"
        >
          <input
            data-testid={`${inputItem.id}-write-contract-user-input-field`}
            className="w-full h-full rounded-lg py-6 px-5 focus:outline-none bg-black-900 black-gradient-1 border-none black-gradient-1-shadow text-white-50 tracking-[0.04em] text-xs font-space-mono focus:caret-lightBlue"
            onChange={(v) => {
              setUserInput(v.target.value);
            }}
            placeholder={inputItem.title}
            value={userInput}
          />
        </div>
      </div>
    </div>
  );
}
