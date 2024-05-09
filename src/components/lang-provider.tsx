import { PropsWithChildren, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import LangContext from "../contexts/lang-context";

export default function LangProvider({ children }: PropsWithChildren) {
    const [lang, setLang] = useState("en");
    let messages = {};
    switch (lang) {
        case "en":
            messages = en;
            break;
        case "ar":
            messages = ar;
    }

    return (
        <LangContext.Provider value={{ "changeLang": (lang: string) => { setLang(lang) } }}>
            <IntlProvider locale={lang} messages={messages}>
                {children}
            </IntlProvider>
        </LangContext.Provider>
    )
}