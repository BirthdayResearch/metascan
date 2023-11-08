import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import TokenApi from "@api/TokenApi";
import WalletAddressApi from "@api/WalletAddressApi";
import { NetworkConnection } from "@contexts/Environment";

import Address, { WalletDetailProps } from "pages/address/[aid]";
import { isAlphanumeric } from "shared/textHelper";

export default function Token(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return <Address {...props} isTokenPage />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<WalletDetailProps>> {
  const { network } = context.query;
  const tokenId = context.params?.tokenId?.toString().trim() as string;

  if (!isAlphanumeric(tokenId)) {
    return { notFound: true };
  }

  try {
    const walletDetail = await WalletAddressApi.getDetail(
      network as NetworkConnection,
      tokenId,
    );
    const counters = await WalletAddressApi.getCounters(
      network as NetworkConnection,
      tokenId,
    );

    const allTokens = await WalletAddressApi.getAllAddressTokens(
      network as NetworkConnection,
      tokenId,
    );
    const tokensCount = allTokens?.length ?? 0;

    const tokenCounters = await TokenApi.getTokenCounters(
      network as NetworkConnection,
      tokenId,
    );

    return {
      props: {
        walletDetail,
        counters,
        tokensCount,
        tokenCounters,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}
