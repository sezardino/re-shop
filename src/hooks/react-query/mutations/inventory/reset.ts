import { useMutationHelper } from "@/libs";
import { api } from "@/services";
import { INVENTORY_QUERY_KEY } from "../../queries";

export const useResetInventoryMutation = () =>
  useMutationHelper({
    mutationFn: () => api.inventory.reset(),
    successMessage: "Inventory reset successfully",
    errorMessage: "Failed to reset inventory",
    getQueriesToInvalidate: () => [[INVENTORY_QUERY_KEY]],
  });
