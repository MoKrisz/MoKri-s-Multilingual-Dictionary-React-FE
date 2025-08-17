import axios from "axios";
import { ODataFetcherParams, OdataResponse } from "../../hooks/useODataQuery";
import { TranslationGroupFormData } from "./components/TranslationGroupForm";
import { TranslationGroup, WordRelatedTranslationGroups } from "./models";
import { SearchTranslationGroupState } from "./state/searchTranslationGroupReducer";
import { RawOdataResponse, transformRawODataResponse } from "../../utils/api";

export const getTranslationGroup = async (
  translationGroupId: string,
  signal: AbortSignal
): Promise<TranslationGroup> => {
  const response = await axios.get<TranslationGroup>(
    "https://localhost:7113/translation-group",
    {
      headers: { "Content-Type": "application/json" },
      params: { translationGroupId },
      signal,
    }
  );

  return response.data;
};

export const postTranslationGroup = async (
  data: TranslationGroupFormData
): Promise<TranslationGroup> => {
  const response = await axios.post<TranslationGroup>(
    "https://localhost:7113/translation-group",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
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

export const getWordRelatedTranslationGroups = async (
  wordId1: number,
  wordId2: number,
  signal: AbortSignal
): Promise<WordRelatedTranslationGroups> => {
  const response = await axios.get<WordRelatedTranslationGroups>(
    `https://localhost:7113/translation-group/word-related-groups?sourceWordId=${wordId1}&targetWordId=${wordId2}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    }
  );

  return response.data;
};
