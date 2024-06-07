import { useQueryHelper } from "@/libs/react-query/helpers/query";
import { api } from "@/services";

export const ALL_PRODUCTS_QUERY_KEY = "all-products";

export const useAllProductsQuery = (enabled = true) =>
  useQueryHelper({
    apiHandler: api.products.all,
    params: {},
    key: ALL_PRODUCTS_QUERY_KEY,
    enabled,
  });
