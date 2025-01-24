import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Icon from "./Icon";

interface PaginationProps {
  dataCount: number;
  dataPerPage: number;
  currentPage: number;
}

export default function Pagination({
  dataCount,
  dataPerPage,
  currentPage,
}: PaginationProps) {
  const maxPageIcons = 5;
  const maxPages = Math.ceil(dataCount / dataPerPage);

  let pages;

  if (currentPage < maxPageIcons - 1) {
    const maxPaginationPage = Math.min(maxPages, maxPageIcons);

    const helper: number[] = [];
    for (let index = 1; index <= maxPaginationPage; index++) {
      helper.push(index);
    }
    pages = (
      <>
        {helper.map((pageCnt) => {
          return (
            <Icon onClick={() => {}}>
              <p>{pageCnt}</p>
            </Icon>
          );
        })}
        {maxPaginationPage !== maxPages ? <p>...</p> : null}
      </>
    );
  } else if (currentPage + maxPageIcons > maxPages) {
    const minPaginationPage = Math.min(
      currentPage,
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
            <Icon onClick={() => {}}>
              <p>{pageCnt}</p>
            </Icon>
          );
        })}
      </>
    );
  } else {
    const helper: number[] = [];
    for (let index = currentPage - 2; index <= currentPage + 2; index++) {
      helper.push(index);
    }

    pages = (
      <>
        <p>...</p>
        {helper.map((pageCnt) => {
          return (
            <Icon onClick={() => {}}>
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
        <Icon onClick={() => {}} disabled={currentPage === 1}>
          <MdKeyboardDoubleArrowLeft />
        </Icon>
        <Icon onClick={() => {}} disabled={currentPage === 1}>
          <MdKeyboardArrowLeft />
        </Icon>
        {pages}
        <Icon onClick={() => {}} disabled={currentPage === maxPages}>
          <MdKeyboardArrowRight />
        </Icon>
        <Icon onClick={() => {}} disabled={currentPage === maxPages}>
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
