import { getFormLanguageOptions } from "../utils";

export interface LanguageDropdownProps {
  isDisabled?: boolean;
  hasEmptyElement?: boolean;
  onChange: (value: number) => void;
  extraStyle?: string;
}

export default function LanguageDropdown({
  isDisabled = false,
  hasEmptyElement = false,
  onChange,
  extraStyle
}: LanguageDropdownProps) {
    const options = getFormLanguageOptions();

  return (
    <select
      id="language"
      name="languageCode"
      className={`rounded-lg border border-black bg-cream px-2 py-1 disabled:opacity-50 ${extraStyle}`}
      disabled={isDisabled}
      onChange={(event) => onChange(+event.target.value)}
    >
      {hasEmptyElement && <option key="0" value="" className="bg-cream" />}

      {options?.map((option) => (
        <option key={option.value} value={option.value} className="bg-cream">
          {option.name}
        </option>
      ))}
    </select>
  );
}
