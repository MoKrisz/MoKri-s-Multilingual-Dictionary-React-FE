import { useState } from "react";
import { PaginationData } from "../components/Pagination";

export const usePagination = () => {
    const [paginationData, setPaginationData] = useState<PaginationData>({
        currentPage: 1,
        dataPerPage: 5,
    });

    const onPaginationChange = (paginationData: PaginationData) => {
        setPaginationData(paginationData);
    }

    return {paginationData, onPaginationChange}
}