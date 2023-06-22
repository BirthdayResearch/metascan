import { SmartContractListItemProps } from "@api/types";
import LinkText from "@components/commons/LinkText";
import clsx from "clsx";
import { formatDateToUTC } from "shared/durationHelper";
import { truncateTextFromMiddle } from "shared/textHelper";
import { FiFileText } from "react-icons/fi";
import BigNumber from "bignumber.js";

interface ListTitleProps {
  title: string;
  className?: string;
}

function ListTitle({ title, className }: ListTitleProps) {
  return (
    <div className={clsx("tracking-[0.01em] text-white-700", className)}>
      {title}
    </div>
  );
}

interface ListBodyProps {
  body: string;
  className?: string;
}

function ListBody({ body, className }: ListBodyProps) {
  return (
    <div
      className={clsx("tracking-[0.01em] text-white-50 break-all", className)}
    >
      {body}
    </div>
  );
}

const fixedTitle = {
  contractName: "Contract name",
  version: "Version",
  compiler: "Compiler",
  transactions: "Transactions",
  verified: "Verified",
};

export default function VerifiedContractRow({
  data,
}: {
  data: SmartContractListItemProps;
}) {
  return (
    <>
      {/* desktop */}
      <div
        data-testid={`${data.address.hash}-desktop-verified-list`}
        className="hidden lg:block"
      >
        <div className="grid grid-cols-12 py-[22px] gap-x-5 items-center">
          <div className="flex flex-row items-center col-span-3 gap-x-4">
            <FiFileText size={24} className="text-white-50 stroke-white-50" />
            <div className="flex flex-col flex-1 gap-y-1">
              <LinkText
                label={truncateTextFromMiddle(data.address.hash, 4)}
                href={`/contract/${data.address.hash}`}
                customStyle="tracking-[0.01em] text-lg"
              />
              <ListBody body={data.address.name} className="text-sm" />
            </div>
          </div>
          <div className="flex flex-row gap-x-2 col-span-2">
            <ListTitle title={fixedTitle.compiler} />
            <ListBody body={data.language} className="capitalize" />
          </div>
          <div className="flex flex-row gap-x-2 col-span-3">
            <ListTitle title={fixedTitle.version} />
            <ListBody body={data.compiler_version} />
          </div>
          <div className="flex flex-row gap-x-2 col-span-2">
            <ListTitle title={fixedTitle.transactions} />
            <ListBody
              body={new BigNumber(data.tx_count ?? 0).toFormat({
                groupSeparator: ",",
                groupSize: 3,
              })}
            />
          </div>
          <div className="flex flex-row gap-x-2 justify-end col-span-2">
            <ListTitle title={fixedTitle.verified} />
            <ListBody body={formatDateToUTC(data.verified_at, "MM/DD/YYYY")} />
          </div>
        </div>
        <div className="bg-black-600 h-[1px] my-1" />
      </div>

      {/* tablet */}
      <div
        data-testid={`${data.address.hash}-tablet-verified-list`}
        className="hidden lg:hidden md:block"
      >
        <div className="grid grid-cols-3 py-6 gap-x-4">
          <div className="flex flex-row gap-x-4 items-center">
            <FiFileText size={24} className="text-white-50 stroke-white-50" />
            <div className="flex flex-col flex-1">
              <LinkText
                label={truncateTextFromMiddle(data.address.hash, 4)}
                href={`/contract/${data.address.hash}`}
                customStyle="tracking-[0.01em] text-lg"
              />
              <ListBody body={data.address.name} className="text-sm" />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-x-2">
              <ListTitle title={fixedTitle.compiler} className="text-sm" />
              <ListBody body={data.language} className="capitalize text-sm" />
            </div>
            <div className="flex flex-row gap-x-2">
              <ListTitle title={fixedTitle.version} className="text-sm" />
              <ListBody body={data.compiler_version} className="text-sm" />
            </div>
          </div>
          <div className="flex flex-col gap-x-2">
            <div className="flex flex-row gap-x-2 justify-end">
              <ListTitle title={fixedTitle.transactions} className="text-sm" />
              <ListBody
                body={new BigNumber(data.tx_count ?? 0).toFormat({
                  groupSeparator: ",",
                  groupSize: 3,
                })}
                className="text-sm"
              />
            </div>
            <div className="flex flex-row gap-x-2 justify-end mt-3">
              <ListTitle title={fixedTitle.verified} className="text-sm" />
              <ListBody
                body={formatDateToUTC(data.verified_at, "MM/DD/YYYY")}
                className="text-sm"
              />
            </div>
          </div>
        </div>
        <div className="bg-black-600 h-[1px]" />
      </div>

      {/* mobile */}
      <div
        data-testid={`${data.address.hash}-mobile-verified-list`}
        className="md:hidden sm:block mt-4"
      >
        <div className="flex flex-col py-4 gap-y-2">
          <div className="flex flex-row gap-x-4 items-center mb-2">
            <FiFileText size={24} className="text-white-50 stroke-white-50" />
            <div className="flex flex-col flex-1">
              <LinkText
                label={truncateTextFromMiddle(data.address.hash, 4)}
                href={`/contract/${data.address.hash}`}
                customStyle="tracking-[0.01em] text-lg"
              />
              <ListBody body={data.address.name} className="text-sm" />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <ListTitle title={fixedTitle.compiler} className="text-sm" />
            <ListBody body={data.language} className="capitalize text-sm" />
          </div>
          <div className="flex flex-row justify-between">
            <ListTitle title={fixedTitle.version} className="text-sm" />
            <ListBody body={data.compiler_version} className="text-sm" />
          </div>
          <div className="flex flex-row justify-between ">
            <ListTitle title={fixedTitle.transactions} />
            <ListBody
              body={new BigNumber(data.tx_count ?? 0).toFormat({
                groupSeparator: ",",
                groupSize: 3,
              })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-row justify-between">
            <ListTitle title={fixedTitle.verified} className="text-sm" />
            <ListBody
              body={formatDateToUTC(data.verified_at, "MM/DD/YYYY")}
              className="text-sm"
            />
          </div>
        </div>
        <div className="bg-black-600 h-[1px] my-2" />
      </div>
    </>
  );
}
