import { useMutationHelper } from "@/libs";
import {
  CreateProductErrorResponse,
  CreateProductRequest,
  api,
} from "@/services";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateProductMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CreateProductRequest) => api.products.create(dto),
    successMessage: "Product created successfully",
    onError: (error) => {
      const typedError = error as AxiosError<CreateProductErrorResponse>;

      if (typeof typedError.response?.data.error === "string")
        toast.error(typedError.response.data.error);
    },
  });
