import { OdataResponse } from "../hooks/useODataQuery";

export interface RawOdataResponse<TData> {
  "@odata.context": string;
  "@odata.count": number;
  value: TData[];
}

export const transformRawODataResponse = <TData>(
  odataResponse: RawOdataResponse<TData>
): OdataResponse<TData> => {
  return {
    count: odataResponse["@odata.count"],
    data: odataResponse.value,
  };
};
