import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enWords from "./locales/en/words.json";
import enTranslationGroups from "./locales/en/translationGroups.json";
import enTags from "./locales/en/tags.json";
import enErrors from "./locales/en/errors.json";
import enTranslation from "./locales/en/translation.json";

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
        errors: enErrors,
        translation: enTranslation,
      },
    },
    ns: [
      "common",
      "words",
      "translationGroups",
      "tags",
      "errors",
      "translation",
    ],
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
