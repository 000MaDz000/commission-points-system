import useTranslation from "../hooks/useTranslation";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children?: React.ReactNode }) {
    const { localeDir } = useTranslation();

    return (
        // force ltr because the direction will be locale language direction
        // and this will make a problem with sidebar location
        <div className={"min-h-screen flex" + (localeDir === "ltr" ? "" : " flex-row-reverse")} dir={"ltr"}>

            <div className="flex">
                <Sidebar />
            </div>

            {/* here we will wrap the locale direction again to the components */}
            <div className="grow" dir={localeDir}>
                {children}
            </div>

        </div>
    )
}