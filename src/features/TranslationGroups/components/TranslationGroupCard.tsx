import { useOptionalTranslationGroupContext } from "../../Translations/components/Translation";
import { TranslationGroup } from "../models";

export interface TranslationGroupCardProps {
  translationGroup: TranslationGroup;
  selectable?: boolean;
  onSelect?: () => void;
  selected?: boolean;
}

const TranslationGroupCard: React.FC<TranslationGroupCardProps> = ({
  translationGroup,
  selectable = false,
  onSelect,
  selected = false,
}) => {
  const context = useOptionalTranslationGroupContext();

  const isSelected =
    context?.selectedTranslationGroups.some(
      (tg) => tg.translationGroupId === translationGroup.translationGroupId
    ) ?? selected;

  const handleSelect = context
    ? () => {
        context.onToggleSelection(translationGroup);
      }
    : onSelect;

  const baseStyle =
    " border-2  bg-complementary-background-secondary hover:bg-complementary-background-secondary-hover group";
  const selectedStyle =
    " border-4 bg-complementary-background-secondary-hover shadow-lg scale-105";

  return (
    <div
      className={`flex flex-col gap-2 p-2 rounded-2xl transition-all duration-200 border-complementary-border-secondary${
        isSelected ? selectedStyle : baseStyle
      }`}
      onClick={handleSelect}
    >
      <div className="flex justify-between">
        <p className="font-bold italic">{translationGroup.description}</p>
        {selectable && <input type="checkbox" checked={isSelected} readOnly />}
      </div>
      <div className="flex gap-2">
        {translationGroup.tags?.map((tag) => (
          <p
            key={`translation-group-card-${translationGroup.translationGroupId}-tag-${tag.tagId}`}
            className="bg-complementary-background-primary text-complementary-text border-2 border-complementary-border-primary px-2 rounded-lg italic text-sm group-hover:bg-complementary-background-primary-hover"
          >
            {tag.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TranslationGroupCard;
