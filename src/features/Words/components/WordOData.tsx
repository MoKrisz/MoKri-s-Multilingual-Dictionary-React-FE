import ODataContainer from "../../../components/ODataContainer";
import { ColumnOrderEnum } from "../../../models/ColumnOrderEnum";
import { fetchWords } from "../api";
import {
  SearchWordsState,
  useSearchWordsReducer,
} from "../state/searchWordsReducer";
import WordODataSearchBar from "./WordODataSearchBar";
import WordOdataTable, { WordSorting } from "./WordOdataTable";

const initialSortingState: WordSorting = {
  article: ColumnOrderEnum.NoSort,
  text: ColumnOrderEnum.NoSort,
  type: ColumnOrderEnum.NoSort,
  languageCode: ColumnOrderEnum.NoSort,
};

const WordOData: React.FC = () => {
  const handleQuerySearch = (searchState: SearchWordsState) => {
    const { isAdvanced, ...queryParams } = searchState;

    return queryParams;
  };

  return (
    <ODataContainer
      queryKeyName="words"
      initialSortingState={initialSortingState}
      fetchData={fetchWords}
      useSearchReducer={useSearchWordsReducer}
      SearchComponent={WordODataSearchBar}
      DisplayComponent={WordOdataTable}
      handleQuerySearch={handleQuerySearch}
    />
  );
};

export default WordOData;
