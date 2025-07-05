import { ODataDisplayComponentWithoutSortingProps } from "../../../components/ODataContainer";
import { TranslationGroup } from "../models";

const TranslationGroupODataCardList: React.FC<
  ODataDisplayComponentWithoutSortingProps<TranslationGroup>
> = ({ data: translationGroups, isPending, isError }) => {
  console.log("cardlist", translationGroups);

  console.log(translationGroups && translationGroups.count > 0);

  let content: React.ReactNode;
  if (isPending) {
    content = <p>Getting the translation groups ...</p>;
  } else if (isError) {
    content = <p>Something went wrong.</p>;
  } else if (translationGroups && translationGroups.count > 0) {
    console.log("bent vagyok!", translationGroups);
    content = translationGroups?.data.map((translationGroup) => (
      <div className="flex flex-col gap-2 p-2 rounded-2xl border border-black bg-lincolngreendarker hover:bg-lincolngreenlighter group">
        <p className="font-bold italic">{translationGroup.description}</p>
        <div className="flex gap-2">
          {translationGroup.tags?.map((tag) => (
            <p className="bg-lincolngreenlighter border border-black px-2 rounded-lg italic group-hover:bg-lincolngreendarker">
              {tag.text}
            </p>
          ))}
        </div>
      </div>
    ));
  } else {
    content = <p>No translation group is available.</p>;
  }

  return <div>{content}</div>;
};

export default TranslationGroupODataCardList;
