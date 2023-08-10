import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {
  SmartContractPageParamsProps,
  SmartContractListItemProps,
} from "@api/types";
import SmartContractApi, {
  SmartContractQueryParamsProps,
} from "@api/SmartContractApi";
import { NetworkConnection } from "@contexts/Environment";
import Pagination from "@components/commons/Pagination";
import { isNumeric } from "shared/textHelper";
import clsx from "clsx";
import Button from "@components/commons/Button";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import VerifiedContractRow from "./_components/VerifiedContractRow";

interface PageProps {
  items: SmartContractListItemProps[];
  next_page_params: SmartContractPageParamsProps;
}

function SmartContractPagination({
  nextPageParams,
  containerClass,
}: {
  nextPageParams: SmartContractPageParamsProps;
  containerClass?: string;
}) {
  return (
    <Pagination<SmartContractQueryParamsProps>
      nextPageParams={
        nextPageParams
          ? {
              smart_contract_id: nextPageParams.smart_contract_id,
              items_count: nextPageParams.items_count,
              type: "smartcontracts",
            }
          : undefined
      }
      containerClass={clsx("!justify-start md:!justify-end", containerClass)}
      pathname="/contracts"
    />
  );
}

export default function VerifiedContracts({ data, isLoading }) {
  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative">
        <div className="p-5 md:p-10">
          <div className="flex flex-row justify-between items-center md:my-4 lg:my-[18px]">
            <h1
              data-testid="verified-contract-list-title"
              className="font-bold text-xl text-white-50"
            >
              Contracts
            </h1>
            <Button
              testId="verify-contract"
              label="Verify contract"
              href="/address/verify"
              customStyle="font-medium text-sm md:text-base !py-2 !px-4 md:!py-3 md:!px-8"
            />
          </div>
          {isLoading ? (
            <SkeletonLoader rows={22} screen={SkeletonLoaderScreen.Contract} />
          ) : (
            data.items.map((item) => (
              <VerifiedContractRow key={item.address.hash} data={item} />
            ))
          )}
          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading && (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            )}
            <SmartContractPagination nextPageParams={data.next_page_params} />
          </div>
        </div>
      </GradientCardContainer>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ data: PageProps; isLoading?: boolean }>> {
  const { network, ...params } = context.query;
  // Avoid fetching if some params are not valid
  const hasInvalidParams =
    !isNumeric(params?.smart_contract_id as string) ||
    !isNumeric(params?.items_count as string) ||
    !isNumeric(params?.page_number as string);
  try {
    const data = hasInvalidParams
      ? await SmartContractApi.getSmartContracts(network as NetworkConnection)
      : await SmartContractApi.getSmartContracts(
          network as NetworkConnection,
          params?.smart_contract_id as string,
          params?.items_count as string
        );
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}
