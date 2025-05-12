import { useState } from "react";
import Button from "../../../components/Button";
import LanguageDropdown from "./LanguageDropdown";

export default function Translation() {
    const [language1, setLanguage1] = useState("0");
    const [language2, setLanguage2] = useState("0");

  return (
    <>
      <h1 className="text-center font-bold text-3xl pb-10 pt-5">
        Add Translation
      </h1>
      <div className="flex justify-between">
        <div className="ml-10">
            <h2>Word 1</h2>
            <LanguageDropdown hasEmptyElement={true} value={language1} onChange={setLanguage1}/>
            <p>search bar</p>
        </div>
        <div className="mr-10">
            <h2>Word 2</h2>
            <LanguageDropdown hasEmptyElement={true} value={language2} onChange={setLanguage2}/>
            <p>search bar</p>
        </div>
      </div>
      <Button className="block mx-auto my-5" onClick={() => {
        console.log()
      }}>Link words</Button>
    </>
  );
}
