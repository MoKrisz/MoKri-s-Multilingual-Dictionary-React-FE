import ODataContainer from "../../../components/ODataContainer";
import { getTranslationGroups } from "../api";
import { useSearchTranslationGroupReducer } from "../state/searchTranslationGroupReducer";
import TranslationGroupODataCardList from "./TranslationGroupODataCardList";
import TranslationGroupODataSearchBar from "./TranslationGroupODataSearchBar";

const TranslationGroupOData: React.FC = () => {
  return (
    <ODataContainer
      queryKeyName="translationGroup"
      fetchData={getTranslationGroups}
      useSearchReducer={useSearchTranslationGroupReducer}
      SearchComponent={TranslationGroupODataSearchBar}
      DisplayComponent={TranslationGroupODataCardList}
    />
  );
};

export default TranslationGroupOData;
