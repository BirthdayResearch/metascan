import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTopLevelRoute } from "shared/urlHelper";
import { Default } from "../layouts/Default";

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = (route) => {
      const newPath = getTopLevelRoute(route);
      const currentPath = getTopLevelRoute(router.pathname);
      const isSamePage = newPath === currentPath;
      if (isSamePage) {
        setIsLoading(true);
      }
    };

    const end = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <Default {...pageProps}>
      <Component {...pageProps} isLoading={isLoading} />
    </Default>
  );
}
