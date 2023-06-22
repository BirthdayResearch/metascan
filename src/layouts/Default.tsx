import Head from "next/head";
import { PropsWithChildren, useEffect, useState } from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { createConfig, WagmiConfig } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Chain } from "viem";

import { NetworkProvider } from "@contexts/NetworkContext";
import { StoreProvider } from "@contexts/StoreProvider";
import { IconGradient } from "@components/icons/IconGradient";
import Container from "@components/commons/Container";
import Footer from "@components/Footer";
import Header from "./components/Header";

const title = "MetaScan";
export const appName = "meta.defiscan.live";
const description =
  "MetaScan is a block explorer for MetaChain - a decentralized network connecting the worlds of Bitcoin and Ethereum.";
const website = "https://meta.defiscan.live";

// TODO: Move this config
export const metachainTestnet = {
  id: 1133,
  name: "MetaChain Testnet",
  network: "metachainTestnet",
  nativeCurrency: {
    decimals: 18,
    name: "MetaChain Testnet",
    symbol: "DFI",
  },
  rpcUrls: {
    // TODO: Replace RPC URLs
    public: { http: ["http://35.187.53.161:20551"] },
    default: { http: ["http://35.187.53.161:20551"] },
  },
  blockExplorers: {
    default: { name: "MetaScan", url: "https://meta.defiscan.live" },
  },
} as const satisfies Chain;

export const metachain = {
  id: 1130,
  name: "MetaChain",
  network: "metachain",
  nativeCurrency: {
    decimals: 18,
    name: "MetaChain",
    symbol: "DFI",
  },
  rpcUrls: {
    // TODO: Replace RPC URLs
    public: { http: ["http://35.187.53.161:20551"] },
    default: { http: ["http://35.187.53.161:20551"] },
  },
  blockExplorers: {
    default: { name: "MetaScan", url: "https://meta.defiscan.live" },
  },
} as const satisfies Chain;

const metamask = new MetaMaskConnector({
  chains: [metachain, metachainTestnet],
});

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    chains: [metachain, metachainTestnet],
    appName,
    connectors: [metamask],
    walletConnectProjectId: "",
  })
);

/**
 * Default Layout with <Head> providing default Metadata for SEO
 *
 * Wrapped in <NetworkProvider> intercept network params from querystring.
 */
export function Default({ children }: PropsWithChildren): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <meta charSet="UTF-8" />
        <title key="title">{title}</title>
        <meta key="description" name="description" content={description} />
        <meta key="robots" name="robots" content="follow,index" />
        <meta
          key="viewport"
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1"
        />
        <meta
          key="apple-mobile-web-app-capable"
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta key="og:locale" name="og:locale" content="en_US" />
        <meta key="og:title" name="og:title" content={title} />
        <meta key="og:site_name" name="og:site_name" content={appName} />
        <meta
          key="og:description"
          name="og:description"
          content={description}
        />
        <meta name="og:image" content="/metascan_share.png" />
        <meta name="og:url" content={website} />

        <meta name="twitter:card" content={description} />
        <meta name="twitter:site" content={website} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://meta.defiscan.live/metascan_share.png"
        />
        <meta name="twitter:image:alt" content={title} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
      </Head>

      {mounted && (
        <WagmiConfig config={config}>
          <ConnectKitProvider mode="dark" options={{ initialChainId: 0 }}>
            <StoreProvider>
              <NetworkProvider>
                <Header />
                <IconGradient />
                <Container className="px-4 md:px-10 lg:px-[120px] flex-grow">
                  <main>{children}</main>
                </Container>
                <div
                  data-testid="bg-purple-gradient"
                  className="w-full h-screen absolute z-[-1] bg-no-repeat top-0 left-0 lg:bg-[url('/background/gradient-purple.png')] md:bg-[url('/background/gradient-purple-tablet.png')] bg-[url('/background/gradient-purple-mobile.png')]"
                />
                <div
                  data-testid="bg-blue-gradient"
                  className="w-full h-screen absolute z-[-1] mix-blend-screen bg-no-repeat bg-contain bg-right lg:bg-[url('/background/gradient-blue)] md:bg-[url('/background/gradient-blue-tablet.png')] bg-[url('/background/gradient-blue-mobile.png')]"
                />
                <div className="relative w-full h-full">
                  <Footer />
                  <div
                    data-testid="bg-footer-image"
                    className="fill w-full h-screen absolute z-[-2] mix-blend-screen bottom-0 left-0 bg-no-repeat bg-cover bg-bottom lg:bg-[url('/background/footer.png')]  md:bg-[url('/background/footer-tablet.png')] bg-[url('/background/footer-mobile.png')]"
                  />
                </div>
              </NetworkProvider>
            </StoreProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      )}
    </div>
  );
}
