import { Switch as SwitchBtn } from "@headlessui/react";

export default function Switch({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <SwitchBtn
      checked={enabled}
      onChange={onClick}
      className={`${
        enabled ? "bg-green-800" : "bg-black-300"
      } relative inline-flex h-[30px] w-[50px] items-center rounded-full`}
    >
      <span
        className={`${
          enabled ? "translate-x-[22px]" : "translate-x-[2px]"
        } inline-block h-[26px] w-[26px] transform rounded-full bg-white-50 transition`}
      />
    </SwitchBtn>
  );
}
