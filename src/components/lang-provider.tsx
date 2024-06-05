import { PropsWithChildren, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import fr from "../locales/fr.json";
import es from "../locales/es.json";
import tr from "../locales/tr.json";
import LangContext from "../contexts/lang-context";
import Settings from "../classes/settings";

export default function LangProvider({ children }: PropsWithChildren) {
    const [lang, setLang] = useState("en");
    let messages = {};

    useEffect(() => {
        Settings.getLocale().then((locale) => {
            if (locale !== lang) {
                setLang(locale);
            }
        })
    }, []);

    const onSelect = async (lang: string) => {
        Settings.setLocale(lang as any).then(() => {
            setLang(lang);
        });
    }

    switch (lang) {
        case "en":
            messages = en;
            break;
        case "ar":
            messages = ar;
            break;
        case "fr":
            messages = fr;
            break;
        case "es":
            messages = es;
            break;
        case "tr":
            messages = tr;
            break;
    }


    return (
        <LangContext.Provider value={{ "changeLang": onSelect }}>
            <IntlProvider locale={lang} messages={messages}>
                {children}
            </IntlProvider>
        </LangContext.Provider>
    )
}