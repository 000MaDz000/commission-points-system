import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import useTranslation from "../hooks/useTranslation";

export default function LanguageSelectorSetting() {
    const { t, locale, changeLang } = useTranslation();

    const onSelect = (v: SelectChangeEvent) => {
        changeLang(v.target.value);
    }

    return (
        <div className="flex flex-col gap-3">
            <Typography variant="h5">{t("settings.change-lang-title")}</Typography>
            <FormControl fullWidth>
                <InputLabel id="language-selector">{t("settings.language-selector")}</InputLabel>

                <Select className="w-full" label={t("settings.language-selector")} labelId="language-selector" value={locale} onChange={onSelect}>
                    <MenuItem value="ar">Arabic</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}