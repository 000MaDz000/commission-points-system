import { createContext } from "react";

const LangContext = createContext({
    changeLang: (lang: string) => { }
});

export default LangContext;