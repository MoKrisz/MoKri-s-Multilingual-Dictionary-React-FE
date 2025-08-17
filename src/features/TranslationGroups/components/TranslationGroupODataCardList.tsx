import { useTranslation } from "react-i18next";
import { ODataDisplayComponentWithoutSortingProps } from "../../../components/ODataContainer";
import { TranslationGroup } from "../models";
import TranslationGroupCard from "./TranslationGroupCard";
import { useTranslationGroupODataGridContext } from "./TranslationGroupOData";
import { useNavigate } from "react-router-dom";

const TranslationGroupODataCardList: React.FC<
  ODataDisplayComponentWithoutSortingProps<TranslationGroup>
> = ({ data: translationGroups, isPending, isError }) => {
  const { t } = useTranslation("errors");
  const navigate = useNavigate();
  const gridContext = useTranslationGroupODataGridContext();

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
        onSelect={() => {
          navigate(
            `/translation-groups/${translationGroup.translationGroupId}`
          );
        }}
      />
    ));
  } else {
    content = (
      <p>{t("noData", { entity: t("translationGroups:translationGroup") })}</p>
    );
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
