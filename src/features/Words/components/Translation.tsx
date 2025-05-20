import { useState } from "react";
import Button from "../../../components/Button";
import LanguageDropdown from "./LanguageDropdown";
import AutofillSearchBar from "./AutofillSearchBar";
import { Word } from "../models";

export default function Translation() {
    const [language1Id, setLanguage1Id] = useState<number>();
    const [language2Id, setLanguage2Id] = useState<number>();
    const [word1, setWord1Id] = useState<Word>();
    const [word2, setWord2Id] = useState<Word>();

  return (
    <>
      <h1 className="text-center font-bold text-3xl pb-10 pt-5">
        Add Translation
      </h1>
      <div className="flex justify-between">
        <div className="flex flex-col ml-10 gap-3">
            <h2>Word to be translated</h2>
            <LanguageDropdown hasEmptyElement={true} onChange={setLanguage1Id} extraStyle="w-28"/>
            <AutofillSearchBar languageId={language1Id} onFill={setWord1Id} />
        </div>
        <div className="flex flex-col mr-10 gap-3">
            <h2>Translation</h2>
            <LanguageDropdown hasEmptyElement={true} onChange={setLanguage2Id} extraStyle="w-28"/>
            <AutofillSearchBar languageId={language2Id} onFill={setWord2Id} />
        </div>
      </div>
      <Button className="block mx-auto my-5" onClick={() => {
        console.log("L1: ", word1?.wordId);
        console.log("L2: ", word2?.wordId);
      }}>Link words</Button>
    </>
  );
}
