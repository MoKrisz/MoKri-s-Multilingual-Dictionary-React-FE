import axios from "axios";
import { ODataFetcherParams, OdataResponse } from "../../hooks/useODataQuery";
import { TranslationGroupFormData } from "./components/TranslationGroupForm";
import { TranslationGroup } from "./models";
import { SearchTranslationGroupState } from "./state/searchTranslationGroupReducer";
import { RawOdataResponse, transformRawODataResponse } from "../../utils/api";

export const postTranslationGroup = async (
  data: TranslationGroupFormData
): Promise<number> => {
  console.log(JSON.stringify(data));

  const response = await fetch("https://localhost:7113/translation-group", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Translation group creation failed.");
  }

  const resJson = await response.json();

  return resJson;
};

export const getTranslationGroups = async ({
  paginationData,
  searchState,
  signal,
}: ODataFetcherParams<SearchTranslationGroupState, undefined>): Promise<
  OdataResponse<TranslationGroup>
> => {
  try {
    let filters: string[] = [];
    if (searchState.description) {
      filters.push(
        `contains(tolower(description), tolower('${searchState.description}'))`
      );
    }

    if (searchState.tagIds.length > 0) {
      const tagsFilter = searchState.tagIds
        .map((tagId) => `tags/any(t: t/tagid eq ${tagId})`)
        .join(" and ");

      filters.push(tagsFilter);
    }

    let odataFilters = "";
    if (filters.length > 0) {
      odataFilters = "&filter=" + filters.join(" and ");
    }

    const skipCount =
      (paginationData.currentPage - 1) * paginationData.dataPerPage;

    const response = await axios.get<OdataResponse<TranslationGroup>>(
      `https://localhost:7113/odata/TranslationGroupList?count=true&top=${paginationData.dataPerPage}&skip=${skipCount}${odataFilters}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        transformResponse: [
          (data: string) => {
            return JSON.parse(data);
          },
          (parsedData: RawOdataResponse<TranslationGroup>) => {
            return transformRawODataResponse(parsedData);
          },
        ],
      }
    );

    return response.data;
  } catch {
    throw new Error("Translation group list fetch failed.");
  }
};
