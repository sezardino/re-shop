import { getQueryClient } from "@/libs";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClientRef = useRef(getQueryClient());

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <NextUIProvider navigate={router.push}>
        <Component {...pageProps} />
        <Toaster richColors position="top-right" expand duration={5000} />
      </NextUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
