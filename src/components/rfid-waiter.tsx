import { useEffect, useState } from "react";
import useRfid from "../hooks/use-rfid";
import RadarWaves from "./radar-waves";
import { useNavigate } from "react-router";
import useTranslation from "../hooks/useTranslation";
import Card from "../models/card";
import Modal from "./modal";
import SetCardDataForm from "./set-card-data-form";

export default function RfidWaiter() {
    const rfid = useRfid();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [id, setId] = useState("");
    const [showConfig, setShowConfig] = useState(false);

    if (rfid && !id) {
        setId(rfid);
    }

    const onClose = () => {
        setId("");
        setShowConfig(false);
    }

    useEffect(() => {
        const handle = async (rfid: string) => {
            const card = await Card.findOne({ code: rfid }).populate("person");
            if (card && card.person) {
                navigate("/person/" + card.person._id);
            }
            else {
                setShowConfig(true);
            }
        }

        if (rfid) handle(rfid);

    }, [rfid, navigate]);

    return (
        <div className="grow relative flex border items-center justify-center overflow-hidden">
            <h1 className="z-50">{t("rfid.awaiter.message")}</h1>
            <RadarWaves />
            {
                <Modal open={showConfig} onClose={() => setShowConfig(false)}>
                    <SetCardDataForm cardId={id as string} onEnd={onClose} />
                </Modal>
            }
        </div>
    )
}