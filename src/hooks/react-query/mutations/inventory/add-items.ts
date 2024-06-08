import { useMutationHelper } from "@/libs";
import {
  AddItemToInventoryErrorResponse,
  AddItemsToInventoryRequest,
  api,
} from "@/services";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { INVENTORY_QUERY_KEY } from "../../queries";

export const useAddItemsToInventoryMutation = () =>
  useMutationHelper({
    mutationFn: (dto: AddItemsToInventoryRequest) =>
      api.inventory.addItems(dto),
    successMessage: "Items added to inventory successfully",
    getQueriesToInvalidate: () => [[INVENTORY_QUERY_KEY]],
    onError: (error) => {
      const typedError = error as AxiosError<AddItemToInventoryErrorResponse>;

      if (typeof typedError.response?.data.error === "string")
        toast.error(typedError.response.data.error);
    },
  });
