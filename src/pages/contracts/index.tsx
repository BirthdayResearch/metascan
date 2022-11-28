import { CursorPagination } from "@components/commons/CursorPagination";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  verifiedContractPages,
  verifiedContracts,
} from "mockdata/VerifiedContractData";
import VerifiedContractRow from "./_components/VerifiedContractRow";

export default function VerifiedContracts({ data }) {
  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative z-10">
        <div className="lg:p-10 md:p-10 px-5 py-11">
          <div className="flex flex-col md:flex-row justify-between md:items-center lg:mb-[42px] md:mb-[45px] mb-12 lg:mt-[19px] md:mt-4">
            <h2
              data-testid="verified-contract-list-title"
              className="font-bold text-xl text-white-50"
            >
              {fixedTitle.title}
            </h2>
            <CursorPagination
              pages={data.verifiedContractPages}
              path="/contracts/"
              className="justify-end mt-5 md:mt-0"
            />
          </div>
          {data.verifiedContracts.map((item) => (
            <VerifiedContractRow key={item.contract} data={item} />
          ))}
          <CursorPagination
            pages={data.verifiedContractPages}
            path="/contracts/"
            className="flex w-full md:justify-end mt-12 md:mt-10 lg:mb-4 md:mb-[19.5px]"
          />
        </div>
      </GradientCardContainer>
    </div>
  );
}

const fixedTitle = {
  title: "Verified contracts",
};

export async function getServerSideProps() {
  // Fetch data from external API
  const data = {
    verifiedContracts,
    verifiedContractPages,
  };

  // Pass data to the page via props
  return { props: { data } };
}
