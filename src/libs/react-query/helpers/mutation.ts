import {
  InvalidateQueryFilters,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface UseMutationHelper<
  Var extends unknown,
  Res extends unknown,
  Args extends unknown,
  Err extends unknown
> extends UseMutationOptions<Res, Err, Var, unknown> {
  getQueriesToInvalidate?: (
    data: Res,
    variables: Var,
    args?: Args
  ) => InvalidateQueryFilters[];
  errorMessage?: string;
  successMessage?: string;
  args?: Args;
}

export const useMutationHelper = <
  Var extends any,
  Res extends unknown,
  Args extends unknown,
  Err extends unknown
>(
  props: UseMutationHelper<Var, Res, Args, Err>
) => {
  const {
    getQueriesToInvalidate,
    successMessage,
    errorMessage,
    args,
    onSuccess,
    onError,
    ...rest
  } = props;
  const client = useQueryClient();

  return useMutation({
    ...rest,
    onSuccess: (res, vars, ctx) => {
      if (getQueriesToInvalidate) {
        const queries = getQueriesToInvalidate(res, vars, args);
        queries
          .filter(Boolean)
          .forEach((query) => client.invalidateQueries(query));
      }

      if (onSuccess) onSuccess(res, vars, ctx);
      if (successMessage) toast.success(successMessage);
    },
    onError: (err, vars, ctx) => {
      if (onError) onError(err, vars, ctx);
      if (errorMessage) toast.error(errorMessage);
    },
  });
};
