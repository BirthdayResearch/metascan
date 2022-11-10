import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Default } from "../layouts/Default";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Default {...pageProps}>
      <Component {...pageProps} />
    </Default>
  );
}
