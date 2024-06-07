export type InfiniteQueryData<Data> = {
  data: Data[];
  totalCount: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  onSearchChange?: (search: string) => void;
  isLoading: boolean;
};
