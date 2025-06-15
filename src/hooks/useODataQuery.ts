import { useQuery } from "@tanstack/react-query";
import { PaginationData } from "../components/Pagination";
import { useEffect } from "react";
import { PaginationFunctions } from "./usePagination";

export interface ODataFetcherParams<TSearchState, TSortingState> {
  paginationData: PaginationData;
  searchState: TSearchState;
  sortingState?: TSortingState;
  signal: AbortSignal;
}

export interface OdataResponse<TData> {
  count: number;
  data: TData[];
}

interface ODataQueryParams<
  TData,
  TSearchState,
  TSortingState,
  TQuerySearchState
> {
  queryKeyName: string;
  paginationData: PaginationData;
  paginationFunctions: PaginationFunctions;
  searchState: TSearchState;
  querySearchState: TQuerySearchState;
  sortingState?: TSortingState;
  fetchData: (
    params: ODataFetcherParams<TSearchState, TSortingState>
  ) => Promise<OdataResponse<TData>>;
}

export function useODataQuery<
  TData,
  TSearchState,
  TSortingState,
  TQuerySearchState
>({
  queryKeyName,
  paginationData,
  paginationFunctions,
  searchState,
  querySearchState,
  sortingState,
  fetchData,
}: ODataQueryParams<TData, TSearchState, TSortingState, TQuerySearchState>) {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKeyName, paginationData, querySearchState, sortingState],
    queryFn: ({ signal }) =>
      fetchData({ paginationData, searchState, sortingState, signal }),
    staleTime: 120000,
  });

  useEffect(() => {
    if (data?.count) {
      paginationFunctions.setDataCount(data?.count);
    }
  }, [data]);

  return { data, isPending, isError };
}
