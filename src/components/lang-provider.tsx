import { PropsWithChildren, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
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
    }


    return (
        <LangContext.Provider value={{ "changeLang": onSelect }}>
            <IntlProvider locale={lang} messages={messages}>
                {children}
            </IntlProvider>
        </LangContext.Provider>
    )
}