import { useEffect, useMemo, useState } from "react";
import { ODataSearchComponentProps } from "../../../components/ODataContainer";
import TextInput from "../../../components/TextInput";
import TagInput from "../../Tags/components/TagInput";
import {
  SearchTranslationGroupAction,
  SearchTranslationGroupState,
} from "../state/searchTranslationGroupReducer";
import { Tag } from "../../Tags/models";
import { useDebounce } from "../../../hooks/useDebounce";
import { useTranslationGroupContext } from "../../Translations/components/Translation";

const TranslationGroupODataSearchBar: React.FC<
  ODataSearchComponentProps<
    SearchTranslationGroupState,
    SearchTranslationGroupAction
  >
> = ({ dispatch }) => {
  const [descriptionState, setDescriptionState] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);

  const tagIds = useMemo(() => {
    return tags.map((t) => t.tagId!);
  }, [tags]);

  const debouneDescriptionState = useDebounce(descriptionState, 300);
  const debounceTagIds = useDebounce(tagIds, 300);

  const { resetSelection } = useTranslationGroupContext();

  useEffect(() => {
    resetSelection();
    dispatch({
      type: "SET_DESCRIPTION_SEARCH",
      description: debouneDescriptionState,
    });
  }, [debouneDescriptionState, dispatch, resetSelection]);

  useEffect(() => {
    resetSelection();
    dispatch({ type: "SET_TAGS_SEARCH", tagIds: debounceTagIds });
  }, [debounceTagIds, dispatch, resetSelection]);

  return (
    <div className="flex gap-10 mb-5 justify-center w-full">
      <div className="flex flex-col">
        <TextInput
          label="Description"
          inputValue={descriptionState}
          setInputValue={setDescriptionState}
          extraStyle="bg-lincolngreendarker"
        />
      </div>
      <div className="flex-col w-3/5 max-w-xl">
        <p>Tags</p>
        <TagInput
          tags={tags}
          onChange={setTags}
          extraStyle="flex-nowrap overflow-x-auto h-12"
          allowNewElements={false}
        />
      </div>
    </div>
  );
};

export default TranslationGroupODataSearchBar;
