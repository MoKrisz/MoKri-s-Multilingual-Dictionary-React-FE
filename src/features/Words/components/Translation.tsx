import { useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import AutofillSearchBar from "./AutofillSearchBar";
import { Word } from "../models";
import { getFormLanguageOptions } from "../utils";
import { Option } from "./FormInput";

const Translation: React.FC = () => {
  const [language1Id, setLanguage1Id] = useState<number>(0);
  const [language2Id, setLanguage2Id] = useState<number>(0);
  const [word1, setWord1] = useState<Word>();
  const [word2, setWord2] = useState<Word>();

  const languageOptions1 = getFormLanguageOptions();
  let languageOptions2: Option[] = [];

  if (language1Id) {
    languageOptions2 = languageOptions1.filter(
      (lo) => lo.value !== language1Id
    );
  }

  function handleLanguage1Change(value: number) {
    setLanguage1Id(value);
    setWord1(undefined);

    if (value === 0 || value === language2Id) {
      setLanguage2Id(0);
      setWord2(undefined);
    }
  }

  function handleLanguage2Change(value: number) {
    setLanguage2Id(value);
    setWord2(undefined);
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl pb-10 pt-5">
        Add Translation
      </h1>
      <div className="flex justify-between">
        <div className="flex flex-col ml-10 gap-3">
          <h2>Word to be translated</h2>
          <Dropdown
            options={languageOptions1}
            hasEmptyElement={true}
            onChange={handleLanguage1Change}
            extraStyle="w-28"
          />
          <AutofillSearchBar languageId={language1Id} onFill={setWord1} />
        </div>
        <div className="flex flex-col mr-10 gap-3">
          <h2>Translation</h2>
          <Dropdown
            options={languageOptions2}
            hasEmptyElement={true}
            onChange={handleLanguage2Change}
            extraStyle="w-28"
            isDisabled={!language1Id}
          />
          <AutofillSearchBar languageId={language2Id} onFill={setWord2} />
        </div>
      </div>
      <Button
        className="block mx-auto my-5"
        onClick={() => {
          console.log("L1: ", word1?.wordId);
          console.log("L2: ", word2?.wordId);
        }}
        isDisabled={!word1 || !word2}
      >
        Link words
      </Button>
    </>
  );
};

export default Translation;
