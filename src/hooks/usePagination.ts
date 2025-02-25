import { useState } from "react";
import { PaginationData } from "../components/Pagination";
import { DataAmountPerPage } from "../models/Pagination";

export interface PaginationFunctions {
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    setDataPerPage: (dataPerPage: number) => void;
};

export const usePagination = () => {
    const [paginationData, setPaginationData] = useState<PaginationData>({
        currentPage: 1,
        dataPerPage: 5,
    });

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
        paginationFunctions: {setPage, nextPage, prevPage, setDataPerPage} as PaginationFunctions}
}