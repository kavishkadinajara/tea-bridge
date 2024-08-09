// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import taTranslations from "../public/locales/ta/translation.json";

import enTranslations from "@/public/locales/en/translation.json";
import siTranslations from "@/public/locales/si/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    si: {
      translation: siTranslations,
    },
    ta: {
      translation: taTranslations,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
