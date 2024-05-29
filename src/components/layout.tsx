import useTranslation from "../hooks/useTranslation";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children?: React.ReactNode }) {
    const { localeDir } = useTranslation();

    return (
        <div className={"min-h-screen flex" + (localeDir === "ltr" ? " flex-row-reverse" : "")}>

            <div className="grow">
                {children}
            </div>

            <div className="flex">
                <Sidebar />
            </div>
        </div>
    )
}