import RadarWaves from "./radar-waves";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Modal } from "@mui/material";
import useRfid from "../hooks/use-rfid";
import { useEffect } from "react";

export default function RfidModal({ onClose, onCard }: { onClose: () => void, onCard: (card: string) => void }) {
    const rfid = useRfid();

    useEffect(() => {
        if (rfid) {
            onCard(rfid);
        }
    }, [rfid]);

    return (

        <Modal open onClose={onClose}>
            <div className="relative ">
                <div className="m-4 flex bg-white w-fit rounded-sm">
                    <Button color="error" startIcon={<CloseIcon />} onClick={onClose}></Button>
                </div>
                <RadarWaves />

            </div>
        </Modal>
    )

}