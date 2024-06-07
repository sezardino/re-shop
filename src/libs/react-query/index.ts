import { QueryClient } from "@tanstack/react-query";

export * from "./helpers";
export * from "./types";

export const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        retry: 1,
        refetchOnWindowFocus: process.env.NODE_ENV !== "development",
      },
    },
  });
};
