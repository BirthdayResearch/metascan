import LinkText from "@components/commons/LinkText";
import { VerifiedContract } from "mockdata/VerifiedContractData";
import { truncateTextFromMiddle } from "shared/textHelper";

export default function VerifiedContractRow({
  data,
}: {
  data: VerifiedContract;
}) {
  return (
    <div>
      {data.status === fixedTitle.verified && (
        <div>
          {/* desktop */}
          <div
            data-testid={`${data.contract}-desktop-verified-list`}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-7 py-[21px]">
              <div className="flex flex-row items-center">
                <LinkText
                  label={truncateTextFromMiddle(data.contract, 4)}
                  href={`/contract/${data.contract}`}
                  customStyle="tracking-[0.01em]"
                />
              </div>
              <div className="flex flex-row gap-x-[4px] col-span-2 justify-center pr-20">
                <ListTitle title={fixedTitle.contractName} />
                <ListBody body={data.contractName} />
              </div>
              <div className="flex flex-row gap-x-[4px]">
                <ListTitle title={fixedTitle.version} />
                <ListBody body={data.version} />
              </div>
              <div className="flex flex-row gap-x-[4px] col-span-2 justify-center pl-10">
                <ListTitle title={fixedTitle.compiler} />
                <ListBody body={data.compiler} />
              </div>
              <div className="flex flex-row gap-x-[4px] justify-end">
                <ListTitle title={fixedTitle.verified} />
                <ListBody body={data.verifiedDate} />
              </div>
            </div>
            <div className="bg-black-600 h-[1px]" />
          </div>

          {/* tablet */}
          <div
            data-testid={`${data.contract}-tablet-verified-list`}
            className="hidden lg:hidden md:block"
          >
            <div className="grid grid-cols-4 grid-rows-2 py-5 gap-y-3">
              <div className="flex flex-row items-center gap-x-[11px]">
                <LinkText
                  label={truncateTextFromMiddle(data.contract, 4)}
                  href={`/contract/${data.contract}`}
                  customStyle="tracking-[0.01em]"
                />
              </div>
              <div className="flex flex-row gap-x-[4px] col-span-2 ">
                <ListTitle title={fixedTitle.contractName} />
                <ListBody body={data.contractName} />
              </div>
              <div className="col-start-2 row-start-2 flex flex-row gap-x-[4px] ">
                <ListTitle title={fixedTitle.compiler} />
                <ListBody body={data.compiler} />
              </div>
              <div className="col-start-4 flex flex-row gap-x-[4px] justify-end">
                <ListTitle title={fixedTitle.version} />
                <ListBody body={data.version} />
              </div>
              <div className="row-start-2 col-start-4 flex flex-row gap-x-[4px] justify-end">
                <ListTitle title={fixedTitle.verified} />
                <ListBody body={data.verifiedDate} />
              </div>
            </div>
            <div className="bg-black-600 h-[1px]" />
          </div>

          {/* mobile */}
          <div
            data-testid={`${data.contract}-mobile-verified-list`}
            className="lg:hidden md:hidden sm:block"
          >
            <div className="grid grid-rows-5 py-6 gap-y-4">
              <div className="flex flex-row items-center gap-x-[11px]">
                <LinkText
                  label={truncateTextFromMiddle(data.contract, 4)}
                  href={`/contract/${data.contract}`}
                  customStyle="tracking-[0.01em]"
                />
              </div>
              <div className="flex flex-row gap-x-[4px]">
                <ListTitle title={fixedTitle.contractName} />
                <ListBody body={data.contractName} />
              </div>
              <div className="flex flex-row gap-x-[4px]">
                <ListTitle title={fixedTitle.version} />
                <ListBody body={data.version} />
              </div>
              <div className="flex flex-row gap-x-[4px] ">
                <ListTitle title={fixedTitle.compiler} />
                <ListBody body={data.compiler} />
              </div>
              <div className="flex flex-row gap-x-[4px]">
                <ListTitle title={fixedTitle.verified} />
                <ListBody body={data.verifiedDate} />
              </div>
            </div>
            <div className="bg-black-600 h-[1px]" />
          </div>
        </div>
      )}
    </div>
  );
}

interface ListTitleProps {
  title: string;
}

function ListTitle({ title }: ListTitleProps) {
  return <div className="tracking-[0.01em] text-white-700">{title}</div>;
}

interface ListBodyProps {
  body: string;
}

function ListBody({ body }: ListBodyProps) {
  return <div className="tracking-[0.01em] text-white-50">{body}</div>;
}

const fixedTitle = {
  contractName: "Contract name",
  version: "Version",
  compiler: "Compiler",
  verified: "Verified",
};
