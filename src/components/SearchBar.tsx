import { useTranslation } from "react-i18next";

interface SearchBarProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  placeholderLocaleKey?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  setInputValue,
  placeholderLocaleKey,
}) => {
  const { t } = useTranslation();

  return (
    <input
      className="px-2 py-1 rounded-xl mb-3 bg-input-background"
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      type="text"
      placeholder={t(placeholderLocaleKey ?? "common:search")}
    />
  );
};

export default SearchBar;
