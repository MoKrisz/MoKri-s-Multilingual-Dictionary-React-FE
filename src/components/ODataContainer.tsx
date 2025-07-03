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

export interface ODataDisplayComponentWithoutSortingProps<TData> {
  data: OdataResponse<TData> | undefined;
  isPending: boolean;
  isError: boolean;
}

export interface ODataDisplayComponentWithSortingProps<TData, TSortingState>
  extends ODataDisplayComponentWithoutSortingProps<TData> {
  sortingState: TSortingState;
  setSortingState: (value: React.SetStateAction<TSortingState>) => void;
}

// interface ODataContainerBaseProps<
//   TSearchState,
//   TSearchActions,
//   TQuerySearchState
// > {
//   queryKeyName: string;
//   useSearchReducer: () => [TSearchState, React.Dispatch<TSearchActions>];
//   handleQuerySearch?: (searchState: TSearchState) => TQuerySearchState;
//   SearchComponent: ComponentType<
//     ODataSearchComponentProps<TSearchState, TSearchActions>
//   >;
// }

// interface ODataContainerWithSortingProps<
//   TData,
//   TSearchState,
//   TSearchActions,
//   TQuerySearchState,
//   TSortingState
// > extends ODataContainerBaseProps<
//     TSearchState,
//     TSearchActions,
//     TQuerySearchState
//   > {
//   initialSortingState: TSortingState;
//   fetchData: (
//     params: ODataFetcherParams<TSearchState, TSortingState>
//   ) => Promise<OdataResponse<TData>>;
//   DisplayComponent: ComponentType<
//     ODataDisplayComponentWithSortingProps<TData, TSortingState>
//   >;
// }

// interface ODataContainerWithoutSortingProps<
//   TData,
//   TSearchState,
//   TSearchActions,
//   TQuerySearchState
// > extends ODataContainerBaseProps<
//     TSearchState,
//     TSearchActions,
//     TQuerySearchState
//   > {
//   fetchData: (
//     params: ODataFetcherParams<TSearchState, undefined>
//   ) => Promise<OdataResponse<TData>>;
//   DisplayComponent: ComponentType<
//     ODataDisplayComponentWithoutSortingProps<TData>
//   >;
// }

interface ODataContainerProps<
  TData,
  TSearchState,
  TSearchActions,
  TQuerySearchState,
  TSortingState
> {
  queryKeyName: string;
  initialSortingState?: TSortingState;
  fetchData: (
    params: ODataFetcherParams<TSearchState, TSortingState>
  ) => Promise<OdataResponse<TData>>;
  useSearchReducer: () => [TSearchState, React.Dispatch<TSearchActions>];
  handleQuerySearch?: (searchState: TSearchState) => TQuerySearchState;
  SearchComponent: ComponentType<
    ODataSearchComponentProps<TSearchState, TSearchActions>
  >;
  DisplayComponent:
    | ComponentType<ODataDisplayComponentWithoutSortingProps<TData>>
    | ComponentType<
        ODataDisplayComponentWithSortingProps<TData, TSortingState>
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

  const handleSortingState = (value: React.SetStateAction<TSortingState>) => {
    setSortingState(value as React.SetStateAction<TSortingState | undefined>);
  };

  const DisplayComponentWithSorting = DisplayComponent as ComponentType<
    ODataDisplayComponentWithSortingProps<TData, TSortingState>
  >;
  const DisplayComponentWithoutSorting = DisplayComponent as ComponentType<
    ODataDisplayComponentWithoutSortingProps<TData>
  >;

  return (
    <div className="mt-5">
      <SearchComponent searchState={searchState} dispatch={searchDispatch} />
      {initialSortingState !== undefined ? (
        <DisplayComponentWithSorting
          data={data}
          isPending={isPending}
          isError={isError}
          {...{
            sortingState: sortingState as TSortingState,
            setSortingState: handleSortingState,
          }}
        />
      ) : (
        <DisplayComponentWithoutSorting
          data={data}
          isPending={isPending}
          isError={isError}
        />
      )}
      <Pagination
        paginationData={paginationData}
        paginationFunctions={paginationFunctions}
      />
    </div>
  );
};

export default ODataContainer;

// export const ODataContainerWithSorting = <
//   TData,
//   TSearchState,
//   TSearchActions,
//   TQuerySearchState,
//   TSortingState
// >({
//   queryKeyName,
//   initialSortingState,
//   fetchData,
//   useSearchReducer,
//   handleQuerySearch,
//   SearchComponent,
//   DisplayComponent,
// }: ODataContainerWithSortingProps<
//   TData,
//   TSearchState,
//   TSearchActions,
//   TQuerySearchState,
//   TSortingState
// >) => {
//   const { paginationData, paginationFunctions } = usePagination();
//   const [sortingState, setSortingState] = useState(initialSortingState);
//   const [searchState, searchDispatch] = useSearchReducer();

//   const querySearchState = handleQuerySearch
//     ? handleQuerySearch(searchState)
//     : searchState;

//   const querySearchStateJson = JSON.stringify(querySearchState);

//   useEffect(() => {
//     if (paginationData.currentPage > 1) {
//       paginationFunctions.setPage(1);
//     }
//   }, [querySearchStateJson]);

//   const { data, isPending, isError } = useODataQuery({
//     queryKeyName,
//     paginationData,
//     paginationFunctions,
//     searchState,
//     querySearchState,
//     sortingState,
//     fetchData,
//   });

//   return (
//     <div className="mt-5">
//       <SearchComponent searchState={searchState} dispatch={searchDispatch} />
//       <DisplayComponent
//         data={data}
//         isPending={isPending}
//         isError={isError}
//         sortingState={sortingState}
//         setSortingState={setSortingState}
//       />
//       <Pagination
//         paginationData={paginationData}
//         paginationFunctions={paginationFunctions}
//       />
//     </div>
//   );
// };

// export const ODataContainerWithoutSorting = <
//   TData,
//   TSearchState,
//   TSearchActions,
//   TQuerySearchState
// >({
//   queryKeyName,
//   fetchData,
//   useSearchReducer,
//   handleQuerySearch,
//   SearchComponent,
//   DisplayComponent,
// }: ODataContainerWithoutSortingProps<
//   TData,
//   TSearchState,
//   TSearchActions,
//   TQuerySearchState
// >) => {
//   const { paginationData, paginationFunctions } = usePagination();
//   const [searchState, searchDispatch] = useSearchReducer();

//   const querySearchState = handleQuerySearch
//     ? handleQuerySearch(searchState)
//     : searchState;

//   const querySearchStateJson = JSON.stringify(querySearchState);

//   useEffect(() => {
//     if (paginationData.currentPage > 1) {
//       paginationFunctions.setPage(1);
//     }
//   }, [querySearchStateJson]);

//   const { data, isPending, isError } = useODataQuery({
//     queryKeyName,
//     paginationData,
//     paginationFunctions,
//     searchState,
//     querySearchState,
//     fetchData,
//   });

//   return (
//     <div className="mt-5">
//       <SearchComponent searchState={searchState} dispatch={searchDispatch} />
//       <DisplayComponent data={data} isPending={isPending} isError={isError} />
//       <Pagination
//         paginationData={paginationData}
//         paginationFunctions={paginationFunctions}
//       />
//     </div>
//   );
// };
