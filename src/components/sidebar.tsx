import { Box, Drawer, List } from "@mui/material"
import useTranslation from "../hooks/useTranslation"
import { Home, Settings, SettingsAccessibility, Style } from "@mui/icons-material";
import SidebarItem from "./sidebar-item";
import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
    const { localeDir, t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<null | undefined>(undefined);

    useEffect(() => {
        setState(null);
    }, []);

    useEffect(() => {
        const listener = () => setState(state === undefined ? null : undefined);

        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener("resize", listener);
        }
    }, [state]);



    return (
        <div style={{ width: (ref.current?.clientWidth || 0) }}>
            <Drawer
                variant="persistent"
                open={true}
                anchor={localeDir === "ltr" ? "left" : "right"}
                dir={localeDir}
            >

                <div ref={ref} onChangeCapture={() => console.log(true)}>
                    <List className="lg:min-w-40 lg:max-w-72">
                        <SidebarItem pageUrl="/home" text={t("sidebar.home")} icon={<Home />} />
                        <SidebarItem pageUrl="/cards" text={t("sidebar.cards")} icon={<Style />} />
                        <SidebarItem pageUrl="/peaple" text={t("sidebar.peaple")} icon={<SettingsAccessibility />} />
                        <SidebarItem pageUrl="/settings" text={t("sidebar.settings")} icon={<Settings />} />
                    </List>
                </div>

            </Drawer>
        </div>
    )
}