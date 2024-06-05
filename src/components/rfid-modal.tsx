import RadarWaves from "./radar-waves";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from "@mui/material";
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
                    <IconButton color="error" onClick={onClose}><CloseIcon /></IconButton>
                </div>
                <RadarWaves />

            </div>
        </Modal>
    )

}