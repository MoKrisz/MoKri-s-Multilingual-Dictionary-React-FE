import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enWords from "./locales/en/words.json";
import enTranslationGroups from "./locales/en/translationGroups.json";
import enTags from "./locales/en/tags.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        words: enWords,
        translationGroups: enTranslationGroups,
        tags: enTags,
      },
    },
    ns: ["common", "words", "translationGroups", "tags"],
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
