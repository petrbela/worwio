import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (process.env.NODE_ENV === "production") {
        //@ts-ignore
        window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          page_path: window.location.pathname,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
