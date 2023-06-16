import useUser from "@/libs/useUser";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  useUser(pathname); 
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
        <div className="w-full max-w-lg mx-auto h-full min-h-screen bg-[#161616] shadow-lg">
          <Component {...pageProps} />
        </div>

    </SWRConfig>
  );
}
