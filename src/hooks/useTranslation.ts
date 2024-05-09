import { useContext } from "react";
import { useIntl } from "react-intl"
import LangContext from "../contexts/lang-context";

export default function useTranslation() {
    const intl = useIntl();
    const { changeLang } = useContext(LangContext);

    return {
        t: (id: string) => {
            return intl.formatMessage({ id });
        },
        changeLang: changeLang,
    }
}