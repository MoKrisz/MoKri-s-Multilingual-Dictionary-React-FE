import { Link } from "react-router-dom";
import Button from "../../../components/Button";
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

  const renderToolbarActions = () => {
    return (
      <Link to="new">
        <Button extraStyle="py-1">Add new Word</Button>
      </Link>
    );
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
      renderToolbarActions={renderToolbarActions}
    />
  );
};

export default WordOData;
