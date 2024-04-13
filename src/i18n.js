import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import translation_en from "./locales/en/translation.json";
import translation_ja from "./locales/ja/translation.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debag: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: translation_en,
      },
      ja: {
        translation: translation_ja,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
