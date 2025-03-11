import { useState } from "react";
import { PaginationData } from "../components/Pagination";
import { DataAmountPerPage } from "../models/Pagination";

export interface PaginationFunctions {
    setDataCount: (dataCount: number) => void;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    setDataPerPage: (dataPerPage: number) => void;
};

export const usePagination = () => {
    const [paginationData, setPaginationData] = useState<PaginationData>({
        dataCount: 0,
        currentPage: 1,
        dataPerPage: 5,
    });

    const setDataCount = (dataCount: number) => {
        setPaginationData((prev) => ({...prev, dataCount: dataCount}));
    }

    const setPage = (page: number) => {
        setPaginationData((prev) => ({...prev, currentPage: page}));
    }

    const nextPage = () => {
        setPaginationData((prev) => ({...prev, currentPage: prev.currentPage+1}));
    }

    const prevPage = () => {
        setPaginationData((prev) => ({...prev, currentPage: prev.currentPage-1}));
    }

    const setDataPerPage = (dataPerPage: DataAmountPerPage) => {
        setPaginationData((prev) => ({...prev, dataPerPage: dataPerPage}));
    }

    return {
        paginationData,
        paginationFunctions: {setDataCount, setPage, nextPage, prevPage, setDataPerPage} as PaginationFunctions}
}