import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import vi from "./vi.json";
import en from "./en.json";

export const resources ={
    en: {translation: en},
    vi: {translation: vi}
}


i18next
    .use(LanguageDetector)            // auto-detect user language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: "v4",
        resources: resources,
        lng: "vi",
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false // r
        },
        detection: {
            // order and from where user language should be detected
            order: ['localStorage','navigator','htmlTag'],
            caches: ['localStorage']
        }
    }).then(r => {});



export default i18next