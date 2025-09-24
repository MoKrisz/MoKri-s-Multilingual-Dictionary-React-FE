import React, { useState } from "react";
import { getLanguagesWithMoreThanOneArticle } from "../../../../utils/languageUtils";
import LanguageCard from "../components/LanguageCard";
import { useTranslation } from "react-i18next";
import Title from "../../../../components/Title";
import SearchBar from "../../../../components/Searchbar";

const GuessArticleLanguageChoosePage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  let languages = getLanguagesWithMoreThanOneArticle();

  if (search) {
    languages = languages.filter((l) =>
      t(`languages.${l.nameKey}`)
        .toLowerCase()
        .startsWith(search.trim().toLowerCase())
    );
  }

  return (
    <div className="w-3/4 mx-auto text-center max-w-screen-xl">
      <Title localeTitleKey="practices:guessArticle" />
      <SearchBar inputValue={search} setInputValue={setSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {languages.map((lang) => (
          <LanguageCard key={`lc-${lang.code}`} language={lang} />
        ))}
      </div>
    </div>
  );
};

export default GuessArticleLanguageChoosePage;
