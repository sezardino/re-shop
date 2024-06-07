import { api } from "@/services";
import { addIdToResponseArray } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const INVENTORY_QUERY_KEY = "inventory";

export const useInventoryQuery = (enabled = true) =>
  useQuery({
    queryFn: () => api.inventory.get(),
    queryKey: [INVENTORY_QUERY_KEY],
    enabled,
    select: addIdToResponseArray,
  });
