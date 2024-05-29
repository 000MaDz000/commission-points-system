import { Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Peaple } from "./peaple-table";
import Person from "../models/person";
import { ScatterChart } from "@mui/x-charts";
import useTranslation from "../hooks/useTranslation";


export default function PeapleScatter() {
    const [scatterData, setScatterData] = useState<number[]>([]); // 0-11 represents the month numberm month+1 = month number in human understand
    const { t } = useTranslation();

    const monthsHashmap = useCallback(() => ({
        "1": t("date.months.January"),
        "2": t("date.months.February"),
        "3": t("date.months.March"),
        "4": t("date.months.April"),
        "5": t("date.months.May"),
        "6": t("date.months.June"),
        "7": t("date.months.July"),
        "8": t("date.months.August"),
        "9": t("date.months.September"),
        "10": t("date.months.October"),
        "11": t("date.months.November"),
        "12": t("date.months.December")
    }), [t])();

    useEffect(() => {
        const getData = async () => {
            const from = new Date();
            from.setDate(1);
            from.setMonth(0); // the function run with 0 to 11 month number
            const to = new Date();
            to.setMonth(11);
            to.setDate(31);

            const data = await Person.find({
                createdAt: {
                    $gte: from,
                    $lte: to,
                },
            });

            return data;
        }

        getData().then(data => {
            const builtScatterData = new Array(12).fill(0);
            data.map((doc) => {
                builtScatterData[doc.createdAt.getMonth()]++;
            });

            setScatterData(builtScatterData)
        })


    }, []);

    return (
        <Container>
            <ScatterChart
                height={475}
                yAxis={[{
                    min: 1,
                    data: [1, 2, 100],
                    label: t("charts.peaple.yLabel")
                }]}

                xAxis={[{
                    data: [
                        0, 1, 2, 12
                    ],
                    valueFormatter(val, ctx) {
                        if (val in monthsHashmap) {
                            return (monthsHashmap as any)[val];
                        }

                        return ""
                    }
                }]}

                series={[{
                    data: scatterData.map((countPeaple, monthNumber) => ({
                        x: monthNumber + 1, // because the hashmap represents the months numbers in human understanding
                        y: countPeaple,
                        id: monthNumber
                    })),
                }]}
            />

        </Container>

    )
}