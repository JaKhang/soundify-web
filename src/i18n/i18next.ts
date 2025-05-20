import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "./vi.json";

export const resources ={
    // en: {translation: en},
    vi: {translation: vi}
}


console.log(resources)
i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: "v4",
        resources: resources,
        lng: "vi",
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false // r
        }
    }).then(r => {});

export default i18next