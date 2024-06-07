import { useQueryHelper } from "@/libs/react-query/helpers/query";
import { api } from "@/services";

export const INVENTORY_QUERY_KEY = "inventory";

export const useInventoryQuery = (enabled = true) =>
  useQueryHelper({
    apiHandler: api.inventory.get,
    params: {},
    key: INVENTORY_QUERY_KEY,
    enabled,
  });
