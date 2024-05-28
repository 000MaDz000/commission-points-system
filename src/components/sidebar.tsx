import { Box, Drawer, List } from "@mui/material"
import useTranslation from "../hooks/useTranslation"
import { Home, Settings, SettingsAccessibility, Style } from "@mui/icons-material";
import SidebarItem from "./sidebar-item";

export default function Sidebar() {
    const { localeDir, t } = useTranslation();
    return (
        <Box>
            <Drawer variant="permanent" open={true} anchor={localeDir === "ltr" ? "left" : "right"} dir={localeDir}>

                <List className="lg:min-w-40 lg:max-w-72 w-fit">
                    <SidebarItem pageUrl="/home" text={t("sidebar.home")} icon={<Home />} />
                    <SidebarItem pageUrl="/cards" text={t("sidebar.cards")} icon={<Style />} />
                    <SidebarItem pageUrl="/person" text={t("sidebar.peaple")} icon={<SettingsAccessibility />} />
                    <SidebarItem pageUrl="/settings" text={t("sidebar.settings")} icon={<Settings />} />
                </List>


            </Drawer>
        </Box>
    )
}