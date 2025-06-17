import React, { ComponentType, Dispatch, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";
import {
  ODataFetcherParams,
  OdataResponse,
  useODataQuery,
} from "../hooks/useODataQuery";

export interface ODataSearchComponentProps<TSearchState, TSearchActions> {
  searchState: TSearchState;
  dispatch: Dispatch<TSearchActions>;
}

export interface ODataDisplayComponentProps<TData, TSortingState> {
  data: OdataResponse<TData> | undefined;
  isPending: boolean;
  isError: boolean;
  sortingState: TSortingState;
  setSortingState: (value: React.SetStateAction<TSortingState>) => void;
}

interface ODataContainerProps<
  TData,
  TSearchState,
  TSearchActions,
  TQuerySearchState,
  TSortingState
> {
  queryKeyName: string;
  initialSortingState: TSortingState;
  fetchData: (
    params: ODataFetcherParams<TSearchState, TSortingState>
  ) => Promise<OdataResponse<TData>>;
  useSearchReducer: () => [TSearchState, React.Dispatch<TSearchActions>];
  handleQuerySearch?: (searchState: TSearchState) => TQuerySearchState;
  SearchComponent: ComponentType<
    ODataSearchComponentProps<TSearchState, TSearchActions>
  >;
  DisplayComponent: ComponentType<
    ODataDisplayComponentProps<TData, TSortingState>
  >;
}

const ODataContainer = <
  TData,
  TSearchState,
  TSearchActions,
  TQuerySearchState,
  TSortingState
>({
  queryKeyName,
  initialSortingState,
  fetchData,
  useSearchReducer,
  handleQuerySearch,
  SearchComponent,
  DisplayComponent,
}: ODataContainerProps<
  TData,
  TSearchState,
  TSearchActions,
  TQuerySearchState,
  TSortingState
>) => {
  const { paginationData, paginationFunctions } = usePagination();
  const [sortingState, setSortingState] = useState(initialSortingState);
  const [searchState, searchDispatch] = useSearchReducer();

  const querySearchState = handleQuerySearch
    ? handleQuerySearch(searchState)
    : searchState;

  const querySearchStateJson = JSON.stringify(querySearchState);

  useEffect(() => {
    if (paginationData.currentPage > 1) {
      paginationFunctions.setPage(1);
    }
  }, [querySearchStateJson]);

  const { data, isPending, isError } = useODataQuery({
    queryKeyName,
    paginationData,
    paginationFunctions,
    searchState,
    querySearchState,
    sortingState,
    fetchData,
  });

  return (
    <div className="mt-5">
      <SearchComponent searchState={searchState} dispatch={searchDispatch} />
      <DisplayComponent
        data={data}
        isPending={isPending}
        isError={isError}
        sortingState={sortingState}
        setSortingState={setSortingState}
      />
      <Pagination
        paginationData={paginationData}
        paginationFunctions={paginationFunctions}
      />
    </div>
  );
};

export default ODataContainer;
