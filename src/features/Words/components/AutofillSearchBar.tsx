import { useQuery } from "@tanstack/react-query";
import { fetchWordsAutofill } from "../api";
import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { Word } from "../models";

interface AutofillSearchBarProps {
  languageId?: number;
  onFill: (word: Word) => void;
}

export default function AutofillSearchBar({
  languageId,
  onFill,
}: AutofillSearchBarProps) {
  const [input, setInput] = useState("");
  const [freezeAutofill, setFreezeAutofill] = useState(false);
  const debouncedInput = useDebounce(input, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["autofill", debouncedInput, languageId],
    queryFn: ({ signal }) =>
      fetchWordsAutofill({
        top: 5,
        languageCode: languageId!,
        input: debouncedInput,
        signal,
      }),
    staleTime: 120000,
    enabled: !!debouncedInput && !!languageId && !freezeAutofill,
  });

  return (
    <div>
      <input
        className="rounded-lg bg-lincolngreen border border-lincolngreendarker py-1 px-2 placeholder:text-black focus:bg-lincolngreenlighter disabled:opacity-30 disabled:bg-gray-200"
        placeholder="Search word..."
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setFreezeAutofill(false);
        }}
        disabled={!languageId}
      />
      {isLoading && (
        <div className="top-full left-0 p-2 text-sm">Loading...</div>
      )}
      {data?.length && !freezeAutofill && (
        <ul className="bg-white border border-gray-300 w-full mt-1 rounded shadow-2xl">
          {data.map((word) => (
            <li
              key={`autofill-${word.wordId}`}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFreezeAutofill(true);
                setInput(word.text);
                onFill(word);
              }}
            >
              {word.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
