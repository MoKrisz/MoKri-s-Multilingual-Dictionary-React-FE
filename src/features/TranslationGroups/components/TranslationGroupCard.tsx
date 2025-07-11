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
    " border border-black bg-lincolngreendarker hover:bg-lincolngreenlighter group";
  const selectedStyle = " border-4 border-yellow-400 shadow-lg scale-[1.02]";

  return (
    <div
      className={`flex flex-col gap-2 p-2 rounded-2xl${
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
            className="bg-lincolngreenlighter border border-black px-2 rounded-lg italic group-hover:bg-lincolngreendarker"
          >
            {tag.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TranslationGroupCard;
