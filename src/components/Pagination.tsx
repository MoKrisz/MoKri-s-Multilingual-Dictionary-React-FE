import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Icon from "./Icon";
import {
  DataAmountPerPage,
  DataAmountPerPageValues,
} from "../models/Pagination";
import { PaginationFunctions } from "../hooks/usePagination";

export interface PaginationData {
  dataCount: number;
  dataPerPage: DataAmountPerPage;
  currentPage: number;
}

export interface PaginationProps {
  paginationData: PaginationData;
  paginationFunctions: PaginationFunctions;
}

export default function Pagination({
  paginationData,
  paginationFunctions,
}: PaginationProps) {
  const maxPageIcons = 5;
  const maxPages = Math.ceil(
    paginationData.dataCount / paginationData.dataPerPage
  );

  let pages;

  if (paginationData.currentPage < maxPageIcons - 1) {
    const maxPaginationPage = Math.min(maxPages, maxPageIcons);

    const helper: number[] = [];
    for (let index = 1; index <= maxPaginationPage; index++) {
      helper.push(index);
    }
    pages = (
      <>
        {helper.map((pageCnt) => {
          return (
            <Icon
              key={"page_" + pageCnt}
              onClick={() => paginationFunctions.setPage(pageCnt)}
              isSelected={pageCnt === paginationData.currentPage}
            >
              <p>{pageCnt}</p>
            </Icon>
          );
        })}
        {maxPaginationPage !== maxPages ? <p>...</p> : null}
      </>
    );
  } else if (paginationData.currentPage + maxPageIcons > maxPages) {
    const minPaginationPage = Math.min(
      paginationData.currentPage,
      Math.max(maxPages - maxPageIcons + 1, 1)
    );

    const helper: number[] = [];
    for (let index = minPaginationPage; index <= maxPages; index++) {
      helper.push(index);
    }

    pages = (
      <>
        {minPaginationPage !== 1 ? <p>...</p> : null}
        {helper.map((pageCnt) => {
          return (
            <Icon
              key={"page_" + pageCnt}
              onClick={() => paginationFunctions.setPage(pageCnt)}
              isSelected={pageCnt === paginationData.currentPage}
            >
              <p>{pageCnt}</p>
            </Icon>
          );
        })}
      </>
    );
  } else {
    const helper: number[] = [];
    for (
      let index = paginationData.currentPage - 2;
      index <= paginationData.currentPage + 2;
      index++
    ) {
      helper.push(index);
    }

    pages = (
      <>
        <p>...</p>
        {helper.map((pageCnt) => {
          return (
            <Icon
              key={"page_" + pageCnt}
              onClick={() => paginationFunctions.setPage(pageCnt)}
              isSelected={pageCnt === paginationData.currentPage}
            >
              <p>{pageCnt}</p>
            </Icon>
          );
        })}
        <p>...</p>
      </>
    );
  }

  return (
    <div className="flex justify-between border border-red-600 w-full p-2">
      <p>∑: {paginationData.dataCount}</p>
      <div className="flex flex-row gap-0.5 mx-auto">
        <Icon
          key={"page_first"}
          onClick={() => paginationFunctions.setPage(1)}
          isDisabled={paginationData.currentPage === 1}
        >
          <MdKeyboardDoubleArrowLeft />
        </Icon>
        <Icon
          key={"page_prev"}
          onClick={() => paginationFunctions.prevPage()}
          isDisabled={paginationData.currentPage === 1}
        >
          <MdKeyboardArrowLeft />
        </Icon>
        {pages}
        <Icon
          key={"page_next"}
          onClick={() => paginationFunctions.nextPage()}
          isDisabled={paginationData.currentPage === maxPages}
        >
          <MdKeyboardArrowRight />
        </Icon>
        <Icon
          key={"page_last"}
          onClick={() => paginationFunctions.setPage(maxPages)}
          isDisabled={paginationData.currentPage === maxPages}
        >
          <MdKeyboardDoubleArrowRight />
        </Icon>
      </div>
      <select
        defaultValue={paginationData.dataPerPage}
        onChange={(event) =>
          paginationFunctions.setDataPerPage(
            Number(event.currentTarget.value) as DataAmountPerPage
          )
        }
      >
        {DataAmountPerPageValues.map((amount) => {
          return <option value={amount}>{amount}</option>;
        })}
      </select>
    </div>
  );
}
