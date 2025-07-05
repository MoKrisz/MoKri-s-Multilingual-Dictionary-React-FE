import { ODataSearchComponentProps } from "../../../components/ODataContainer";
import TextInput from "../../../components/TextInput";
import {
  SearchTranslationGroupAction,
  SearchTranslationGroupState,
} from "../state/searchTranslationGroupReducer";

const TranslationGroupODataSearchBar: React.FC<
  ODataSearchComponentProps<
    SearchTranslationGroupState,
    SearchTranslationGroupAction
  >
> = ({ searchState, dispatch }) => {
  return (
    <div className="flex gap-10 mb-5 justify-center">
      <div className="flex-col">
        <TextInput
          label="Description"
          inputValue={searchState.description}
          setInputValue={(value) =>
            dispatch({ type: "SET_DESCRIPTION_SEARCH", description: value })
          }
          extraStyle="bg-lincolngreendarker"
        />
      </div>
      <div>
        <p>Tags</p>
        <input></input>
      </div>
    </div>
  );
};

export default TranslationGroupODataSearchBar;
