import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  SmartContractPageParamsProps,
  SmartContractListItemProps,
} from "@api/types";
import { SmartContractQueryParamsProps } from "@api/SmartContractApi";
import Pagination from "@components/commons/Pagination";
import clsx from "clsx";
import Button from "@components/commons/Button";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import { useNetwork } from "@contexts/NetworkContext";
import { useGetContractsMutation } from "@store/contract";
import { sleep } from "shared/sleep";
import VerifiedContractRow from "./_components/VerifiedContractRow";

export default function VerifiedContracts() {
  const [contracts, setContracts] = useState<SmartContractListItemProps[]>([]);
  const [nextPage, setNextPage] = useState<SmartContractPageParamsProps>();

  const [isLoading, setIsLoading] = useState(true);
  const { connection } = useNetwork();
  const [trigger] = useGetContractsMutation();
  const router = useRouter();

  const params = router.query;
  const fetchTransactions = async () => {
    setIsLoading(true);
    const data = await trigger({
      network: connection,
      smartContractId: params.smart_contract_id as string,
      itemsCount: params.items_count as string,
    }).unwrap();
    setContracts(data.items);
    setNextPage(data.next_page_params);
    await sleep(150); // added timeout to prevent flicker
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [params.page_number]);

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative">
        <div className="p-5 md:p-10">
          <div className="flex flex-row justify-between items-center md:my-4 lg:my-[18px]">
            <h2
              data-testid="verified-contract-list-title"
              className="font-bold text-xl text-white-50"
            >
              Contracts
            </h2>
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
            contracts.map((item) => (
              <VerifiedContractRow key={item.address.hash} data={item} />
            ))
          )}
          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading && (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            )}
            <SmartContractPagination nextPageParams={nextPage} />
          </div>
        </div>
      </GradientCardContainer>
    </div>
  );
}

function SmartContractPagination({
  nextPageParams,
  containerClass,
}: {
  nextPageParams?: SmartContractPageParamsProps;
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
