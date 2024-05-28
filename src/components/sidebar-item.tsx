import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function SidebarItem({ text, icon, pageUrl }: { text: string, icon: React.ReactNode, pageUrl: string }) {
    return (
        <ListItem>
            <NavLink to={pageUrl} className="w-full [&.active]:bg-slate-100">
                <ListItemButton className="w-14 flex items-center justify-center lg:w-fit">
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} className="hidden lg:block" />
                </ListItemButton>
            </NavLink>
        </ListItem>
    )
}