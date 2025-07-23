import { ODataDisplayComponentWithoutSortingProps } from "../../../components/ODataContainer";
import { TranslationGroup } from "../models";
import TranslationGroupCard from "./TranslationGroupCard";

const TranslationGroupODataCardList: React.FC<
  ODataDisplayComponentWithoutSortingProps<TranslationGroup>
> = ({ data: translationGroups, isPending, isError }) => {
  let content: React.ReactNode;
  if (isPending) {
    content = <p>Getting the translation groups ...</p>;
  } else if (isError) {
    content = <p>Something went wrong.</p>;
  } else if (translationGroups && translationGroups.count > 0) {
    content = translationGroups?.data.map((translationGroup) => (
      <TranslationGroupCard
        key={`translation-group-card-${translationGroup.translationGroupId}`}
        translationGroup={translationGroup}
        selectable
      />
    ));
  } else {
    content = <p>No translation group is available.</p>;
  }

  return <div>{content}</div>;
};

export default TranslationGroupODataCardList;
