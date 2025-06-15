import React, { ComponentType, Dispatch, useState } from "react";
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
  const [sorting, setSorting] = useState(initialSortingState);
  const [searchState, searchDispatch] = useSearchReducer();

  //TODO: Maybe it should be handled with the searchStateReducer. Only an idea. Must look into it.
  //   useEffect(() => {
  //     if (searchWordsState.word || searchWordsState.filters) {
  //       paginationFunctions.setPage(1);
  //     }
  //   }, [searchWordsState.word, searchWordsState.filters]);

  const { data, isPending, isError } = useODataQuery({
    queryKeyName: queryKeyName,
    paginationData,
    paginationFunctions,
    searchState: searchState,
    querySearchState: handleQuerySearch
      ? handleQuerySearch(searchState)
      : searchState,
    sortingState: sorting,
    fetchData: fetchData,
  });

  return (
    <div className="mt-5">
      <SearchComponent searchState={searchState} dispatch={searchDispatch} />
      <DisplayComponent
        data={data}
        isPending={isPending}
        isError={isError}
        sortingState={sorting}
        setSortingState={setSorting}
      />
      <Pagination
        paginationData={paginationData}
        paginationFunctions={paginationFunctions}
      />
    </div>
  );
};

export default ODataContainer;
