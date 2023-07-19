import { useEffect, useRef, useState } from "react";
import Dropdown from "@components/commons/Dropdown";
import Modal from "@components/commons/Modal";
import InputComponent from "@components/commons/InputComponent";
import SubmitButton from "./SubmitButton";

export default function AddZeroesModal({
  isOpen,
  onCloseModal,
  onAdd,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  onAdd: (selected: string) => void;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [selected, setSelected] = useState({ label: "", value: "" });
  const [error, setError] = useState("");
  const [customDecimal, setCustomDecimal] = useState<string | number>("");
  const decimals = [
    { label: "6", value: "6" },
    { label: "8", value: "8" },
    { label: "16", value: "16" },
    { label: "18", value: "18" },
    { label: "Custom", value: "custom" },
  ];

  const resetForm = () => {
    // Added timeout to prevent text flicker (wait for ui transitions)
    setTimeout(() => {
      setSelected({ label: "", value: "" });
      setCustomDecimal("");
    }, 300);
  };

  const handleAddButton = () => {
    const ZERO = "0";
    let numberOfZeroes = Number(selected.value);
    if (selected.value === "custom") {
      numberOfZeroes = Number(customDecimal ?? 0);
    }
    onAdd(ZERO.repeat(numberOfZeroes));
    resetForm();
  };

  const handleModalClose = () => {
    resetForm();
    onCloseModal();
  };

  useEffect(() => {
    if (selected.value === "custom") {
      // Needed timeout to wait for ui transitions
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [selected.value]);

  useEffect(() => {
    const MAX_ALLOWED = 20;
    if (Number(customDecimal) > MAX_ALLOWED) {
      setError(`Exceeded maximum value allowed of ${MAX_ALLOWED}`);
    } else {
      setError("");
    }
  }, [customDecimal]);

  return (
    <Modal title="Add Zeroes" isOpen={isOpen} onCloseModal={handleModalClose}>
      <Dropdown
        value={selected}
        placeholder="Select"
        options={decimals}
        onChange={setSelected}
        dropdownContainerClassName="!py-2 cursor-pointer"
        labelClass="!text-base"
      />
      {selected.value === "custom" && (
        <>
          <InputComponent
            ref={ref}
            type="number"
            value={customDecimal}
            setValue={setCustomDecimal}
            placeholder=""
            inputClass="!text-base"
            inputContainerClassName="!py-2 mt-4"
            error={error}
            errorClass="text-xxs text-red-800"
          />
          {!error && (
            <div className="text-xxs text-white-700 mt-2">
              Enter the number of zeroes to add. Example: 3 to add three (000)
              zeroes.
            </div>
          )}
        </>
      )}

      <div className="mt-10 text-right">
        <SubmitButton
          label="Add"
          testId="add-zeroes-button"
          onClick={() => handleAddButton()}
          disabled={!!error}
        />
      </div>
    </Modal>
  );
}
