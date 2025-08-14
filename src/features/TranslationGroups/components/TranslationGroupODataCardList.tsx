import { ODataDisplayComponentWithoutSortingProps } from "../../../components/ODataContainer";
import { TranslationGroup } from "../models";
import TranslationGroupCard from "./TranslationGroupCard";
import { useTranslationGroupODataGridContext } from "./TranslationGroupOData";

const TranslationGroupODataCardList: React.FC<
  ODataDisplayComponentWithoutSortingProps<TranslationGroup>
> = ({ data: translationGroups, isPending, isError }) => {
  const gridContext = useTranslationGroupODataGridContext();

  console.log(gridContext);

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
        selectable={gridContext.shouldDisplayCheckbox}
      />
    ));
  } else {
    content = <p>No translation group is available.</p>;
  }

  return (
    <div
      className={`flex flex-col gap-2 items-center ${
        gridContext.shouldUseGridLayout ? "xl:grid xl:grid-cols-5 xl:gap-4" : ""
      }`}
    >
      {content}
    </div>
  );
};

export default TranslationGroupODataCardList;
