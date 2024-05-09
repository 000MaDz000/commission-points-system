import { useEffect } from "react";
import useRfid from "../hooks/use-rfid";
import RadarWaves from "./radar-waves";
import { useNavigate } from "react-router";
import useTranslation from "../hooks/useTranslation";

export default function RfidWaiter() {
    const rfid = useRfid();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (rfid) {
            navigate("/cards/" + rfid)
        }
    }, [rfid, navigate]);

    return (
        <div className="grow relative flex border items-center justify-center overflow-hidden">
            <h1 className="z-50">{t("rfid.awaiter.message")}</h1>
            <RadarWaves />
        </div>
    )
}