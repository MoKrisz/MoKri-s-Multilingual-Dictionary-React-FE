export const DataAmountPerPageValues = [5, 20, 50, 100] as const;
export type DataAmountPerPage = (typeof DataAmountPerPageValues)[number];