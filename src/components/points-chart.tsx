import { PersonType } from "../models/person";
import { useContext, useEffect, useState } from "react";
import Points, { PointsType } from "../models/points";
import { LineChart } from "@mui/x-charts";
import MonthSelector from "./month-selector";
import useTranslation from "../hooks/useTranslation";
import PointsContext from "../contexts/points";

export default function PointsArrowChart({ person }: { person: PersonType & { _id: string } }) {
    const [points, setPoints] = useState<((PointsType & { _id: string }) | null)[][]>([[], []]);
    const [monthNumber, setMonthNumber] = useState(new Date().getMonth());
    const pointsContext = useContext(PointsContext);
    const personPoints = pointsContext.points;
    const { t } = useTranslation();

    useEffect(() => {
        const getDatePoints = async (from: Date, to: Date) => {

            const objects = await Points.find({
                "person": person._id,
                "date": {
                    $gte: from,
                    $lte: to
                }
            });

            const negative: (PointsType & { _id: string })[] = new Array(31).fill(null);
            const possitive: (PointsType & { _id: string })[] = new Array(31).fill(null);

            for (let obj of objects) {

                if (obj.points < 0) {
                    negative[obj.date.getDate() - 1] = obj.toObject();
                }
                else {
                    possitive[obj.date.getDate() - 1] = obj.toObject();
                }
            }

            return [possitive, negative];
        }

        const from = new Date();
        const to = new Date();
        from.setDate(1);
        from.setMonth(monthNumber);
        to.setMonth(monthNumber);
        to.setDate(31);


        getDatePoints(from, to).then(objects => {
            setPoints(objects as any);

        });

    }, [monthNumber, personPoints, pointsContext.points]);


    return (

        <div className="flex flex-col items-start p-5 justify-center mx-auto w-full bg-slate-200">
            <MonthSelector onSelect={(from) => { setMonthNumber(from.getMonth()) }} />

            <LineChart
                height={500}
                series={[
                    {
                        data: points[0].map((p) => p ? p.points : p),
                        label: t("charts.points.positive"),
                        "curve": "linear",
                    },
                    {
                        data: points[1].map((p) => p ? p.points : p),
                        label: t("charts.points.negative"),
                        "curve": "linear",
                        color: "pink"
                    },
                ]}

                xAxis={[
                    {
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                        min: 1,
                        max: 31,
                        label: t("charts.points.xlabel"),
                    }
                ]}

                yAxis={[{
                    valueFormatter(value) {
                        return value.toString()
                    },

                    "min": 1,
                    max: person.points >= 100 ? person.points : 100,
                    label: t("charts.points.ylabel")
                }]}

                slotProps={{
                    "noDataOverlay": { message: t("charts.points.noData") }
                }
                }

            />
        </div>

    )

}