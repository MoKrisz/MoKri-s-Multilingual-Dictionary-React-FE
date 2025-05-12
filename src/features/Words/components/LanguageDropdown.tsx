import { getFormLanguageOptions } from "../utils";

export interface LanguageDropdownProps {
  isDisabled?: boolean;
  hasEmptyElement?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageDropdown({
  isDisabled = false,
  hasEmptyElement = false
}: LanguageDropdownProps) {
    const options = getFormLanguageOptions();

    //Maybe I should use a ref here.
  return (
    <select
      id="language"
      name="languageCode"
      className="rounded-lg border border-black bg-cream px-2 py-1 disabled:opacity-50"
      disabled={isDisabled}
      //value={value}
      //onChange={(event) => onChange(event.target.value)}
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
