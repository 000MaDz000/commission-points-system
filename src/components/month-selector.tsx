import useTranslation from "../hooks/useTranslation"

export const monthHashmap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}

type Months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}

export default function MonthSelector({ onSelect }: { onSelect: (from: Date, to: Date) => void }) {
    const { t } = useTranslation();

    return (
        <select className="p-2 flex bg-slate-50" onChange={(e) => {
            const val = e.target.value as keyof (Months);
            const from = new Date();
            const to = new Date();
            from.setMonth(monthHashmap[val] - 1);
            to.setMonth(monthHashmap[val]);

            onSelect(from, to);
        }}>
            <option value={"January"}>{t("date.months.January")}</option>
            <option value={"February"}>{t("date.months.February")}</option>
            <option value={"March"}>{t("date.months.March")}</option>
            <option value={"April"}>{t("date.months.April")}</option>
            <option selected value={"May"}>{t("date.months.May")}</option>
            <option value={"June"}>{t("date.months.June")}</option>
            <option value={"July"}>{t("date.months.July")}</option>
            <option value={"August"}>{t("date.months.August")}</option>
            <option value={"September"}>{t("date.months.September")}</option>
            <option value={"October"}>{t("date.months.October")}</option>
            <option value={"November"}>{t("date.months.November")}</option>
            <option value={"December"}>{t("date.months.December")}</option>
        </select>
    )
}