import { useMutationHelper } from "@/libs";
import {
  AddItemToInventoryErrorResponse,
  AddItemToInventoryRequest,
  api,
} from "@/services";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { INVENTORY_QUERY_KEY } from "../../queries";

export const useAddItemToInventoryMutation = () =>
  useMutationHelper({
    mutationFn: (dto: AddItemToInventoryRequest) => api.inventory.addItem(dto),
    successMessage: "Item added to inventory successfully",
    getQueriesToInvalidate: () => [[INVENTORY_QUERY_KEY]],
    onError: (error) => {
      const typedError = error as AxiosError<AddItemToInventoryErrorResponse>;

      if (typeof typedError.response?.data.error === "string")
        toast.error(typedError.response.data.error);
    },
  });
