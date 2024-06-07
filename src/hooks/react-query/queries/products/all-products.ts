import { api } from "@/services";
import { addIdToResponseArray } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const ALL_PRODUCTS_QUERY_KEY = "all-products";

export const useAllProductsQuery = (enabled = true) =>
  useQuery({
    queryFn: () => api.products.all(),
    queryKey: [ALL_PRODUCTS_QUERY_KEY],
    enabled,
    select: addIdToResponseArray,
  });
