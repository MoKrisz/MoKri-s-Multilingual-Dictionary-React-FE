import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Icon from "./Icon";

export interface PaginationData {
  dataPerPage: number;
  currentPage: number;
}

export interface PaginationProps {
  dataCount: number;
  paginationData: PaginationData;
  onChange: (paginationData: PaginationData) => void;
}

export default function Pagination({
  dataCount,
  paginationData,
  onChange
}: PaginationProps) {
  const maxPageIcons = 5;
  const maxPages = Math.ceil(dataCount / paginationData.dataPerPage);

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
            <Icon onClick={() => onChange({dataPerPage: paginationData.dataPerPage, currentPage: pageCnt})}>
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
            <Icon onClick={() => onChange({dataPerPage: paginationData.dataPerPage, currentPage: pageCnt})}>
              <p>{pageCnt}</p>
            </Icon>
          );
        })}
      </>
    );
  } else {
    const helper: number[] = [];
    for (let index = paginationData.currentPage - 2; index <= paginationData.currentPage + 2; index++) {
      helper.push(index);
    }

    pages = (
      <>
        <p>...</p>
        {helper.map((pageCnt) => {
          return (
            <Icon onClick={() => onChange({dataPerPage: paginationData.dataPerPage, currentPage: pageCnt})}>
              <p>{pageCnt}</p>
            </Icon>
          );
        })}
        <p>...</p>
      </>
    );
  }

  return (
    <div className="flex justify-between border border-red-600 w-full m-1">
      <nav className="flex flex-row gap-0.5 mx-auto">
        {/* TODO: EZ ITT NO GO! MINDENKÉPP JAVÍTSD HOGY NE STATE-1-EL LEGYEN MÓDOSÍTVA */}
        <Icon key={'first'} onClick={() => onChange({dataPerPage: paginationData.dataPerPage, currentPage: 1})} disabled={paginationData.currentPage === 1}>
          <MdKeyboardDoubleArrowLeft />
        </Icon>
        <Icon key={'prev'} onClick={() => onChange({dataPerPage: paginationData.dataPerPage, currentPage: paginationData.currentPage-1})} disabled={paginationData.currentPage === 1}>
          <MdKeyboardArrowLeft />
        </Icon>
        {pages}
        <Icon key={'next'} onClick={() => onChange({dataPerPage: paginationData.dataPerPage, currentPage: paginationData.currentPage+1})} disabled={paginationData.currentPage === maxPages}>
          <MdKeyboardArrowRight />
        </Icon>
        <Icon key={'last'} onClick={() => onChange({dataPerPage: paginationData.dataPerPage, currentPage: maxPages})} disabled={paginationData.currentPage === maxPages}>
          <MdKeyboardDoubleArrowRight />
        </Icon>
      </nav>
      <select>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  );
}
