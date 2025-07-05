import { useQuery } from "@tanstack/react-query";
import { KeyboardEvent } from "react";
import { useDebounce } from "../hooks/useDebounce";

export interface GetAutofillDataProps {
  input: string;
  signal: AbortSignal;
}

export interface AutofillInputProps<TData> {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  queryKeys: string[];
  getAutofillData: (values: GetAutofillDataProps) => Promise<TData[]>;
  placeholder: string;
  renderItem: (item: TData) => React.ReactElement<"li">;
  debounceValue?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  handleKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  style?: string;
  disabled?: boolean;
  extraQueryEnableLogic?: boolean;
  freezeListDisplay?: boolean;
}

const AutofillInput = <TData,>({
  inputValue,
  setInputValue,
  queryKeys,
  getAutofillData,
  placeholder,
  renderItem,
  debounceValue,
  inputRef,
  handleKeyDown,
  style,
  disabled = false,
  extraQueryEnableLogic,
  freezeListDisplay = false,
}: AutofillInputProps<TData>) => {
  const debouncedInput = useDebounce(inputValue, debounceValue ?? 300);

  const debouncedInputTrimmedValue = debouncedInput.trim();

  const { data } = useQuery({
    queryKey: ["autofill", debouncedInputTrimmedValue, ...queryKeys],
    queryFn: ({ signal }) =>
      getAutofillData({ input: debouncedInputTrimmedValue, signal }),
    staleTime: 120000,
    enabled:
      !!debouncedInputTrimmedValue &&
      !freezeListDisplay &&
      (extraQueryEnableLogic === undefined || extraQueryEnableLogic),
  });

  return (
    <div>
      <input
        className={style}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
      {data && data.length > 0 && !freezeListDisplay && (
        <ul className="absolute bg-white border border-gray-300 mt-1 rounded shadow-2xl">
          {data.map((data) => renderItem(data))}
        </ul>
      )}
    </div>
  );
};

export default AutofillInput;
