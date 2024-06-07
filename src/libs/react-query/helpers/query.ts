import { useCallback, useMemo } from "react";

interface UseQueryHelper<Params extends object, Response extends unknown> {
  params: Params;
  key: string;
  enabled?: boolean;
  apiHandler: (params: Params) => Promise<Response>;
}

interface UseQueryHelperReturn<Response extends unknown> {
  queryKey: any[];
  queryFn: () => Promise<Response>;
  enabled: boolean;
}

export const useQueryHelper = <Response extends unknown, Params extends Object>(
  props: UseQueryHelper<Params, Response>
): UseQueryHelperReturn<Response> => {
  const { enabled = true, params, key, apiHandler } = props;

  const queryKey = useMemo(
    () => [key, ...Object.values(params)],
    [params, key]
  );

  const queryFn = useCallback(
    async () => await apiHandler(params),
    [apiHandler, params]
  );

  return {
    queryFn,
    queryKey,
    enabled,
  };
};
