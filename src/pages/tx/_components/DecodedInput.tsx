import clsx from "clsx";
import { DecodedTxInput } from "@api/types";
import BoldedTitle from "./BoldedTitle";

interface Input {
  title: string;
  value: string | string[];
}

export default function DecodedInput({ input }: { input: DecodedTxInput }) {
  return (
    <div>
      <BoldedTitle
        className="pb-6"
        testId="transaction-decoded-input-title"
        title="Decoded Input"
      />
      {/* Method id and call */}
      <div className={clsx("flex flex-col gap-4", "md:flex-row md:gap-7")}>
        <MethodRow title="Method Id" value={input.method_id} />
        <MethodRow title="Method call" value={input.method_call} />
      </div>
      {input.parameters?.length > 0 && (
        <div className="text-white-50 flex flex-col gap-2 mt-6 rounded-md py-2 px-4 border-black-600 border-[1px]">
          <div className="hidden md:grid grid-cols-4 gap-2 text-white-700 font-medium border-b border-black-600 pb-2">
            <div className="flex items-center">Name</div>
            <div className="flex items-center">Type</div>
            <div className="col-span-2 flex items-center">Data</div>
          </div>
          {input.parameters.map((param) => (
            <div
              className={clsx(
                "flex flex-col gap-2 border-b border-black-600 pb-2 last:border-0",
                "md:grid md:grid-cols-4"
              )}
            >
              <ParameterRow title="Name" value={param.name} />
              <ParameterRow title="Type" value={param.type} />
              <ParameterRow title="Data" value={param.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MethodRow({ title, value }: Input) {
  return (
    <div
      className={clsx(
        "flex justify-between gap-y-2 gap-x-1",
        "md:flex-col md:justify-normal",
        "xs:flex-col xs:gap-y-1"
      )}
    >
      <div className="text-white-700 font-medium">{title}</div>
      <div className="text-white-50 font-space-mono text-right xs:text-left break-all">
        {value}
      </div>
    </div>
  );
}

function ParameterRow({ title, value }: Input) {
  return (
    <div
      className={clsx(
        "flex gap-2 items-center justify-between last:col-span-2 xs:flex-col xs:items-start xs:gap-1"
      )}
    >
      <div className="md:hidden text-white-700">{title}</div>
      <div className="flex flex-col text-end md:text-start">
        {typeof value === "object" ? (
          <>
            {value.map((v) => (
              <div className="break-all">{v}</div>
            ))}
          </>
        ) : (
          <div className="break-all text-end md:text-start">{value}</div>
        )}
      </div>
    </div>
  );
}
