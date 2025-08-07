import { fetchWordsAutofill } from "../api";
import { useEffect, useState } from "react";
import { Word } from "../models";
import AutofillInput from "../../../components/AutofillInput";

interface AutofillSearchBarProps {
  languageId: number;
  onFill: (word: Word) => void;
}

export default function AutofillSearchBar({
  languageId,
  onFill,
}: AutofillSearchBarProps) {
  const [inputState, setInputState] = useState("");
  const [freezeListDisplay, setFreezeListDisplay] = useState(false);

  useEffect(() => {
    setInputState("");
  }, [languageId]);

  const renderListItem = (word: Word) => {
    return (
      <li
        key={`word-autofill-${word.wordId}`}
        className="p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => {
          setInputState(word.text);
          setFreezeListDisplay(true);
          onFill(word);
        }}
      >
        {word.text}
      </li>
    );
  };

  const handleSetInputValue = (value: string) => {
    setInputState(value);
    setFreezeListDisplay(false);
  };

  return (
    <div className="relative w-full">
      <AutofillInput
        style="rounded-lg bg-input-background border border-black py-1 px-2 placeholder:text-black disabled:opacity-30 disabled:bg-gray-200"
        inputValue={inputState}
        setInputValue={handleSetInputValue}
        queryKeys={["word", String(languageId)]}
        getAutofillData={(values) => {
          return fetchWordsAutofill({
            top: 5,
            languageCode: languageId,
            input: values.input,
            signal: values.signal,
          });
        }}
        placeholder="Search word..."
        renderItem={renderListItem}
        disabled={!languageId}
        extraQueryEnableLogic={!!languageId}
        freezeListDisplay={freezeListDisplay}
      />
    </div>
  );
}
