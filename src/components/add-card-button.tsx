import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useTranslation from "../hooks/useTranslation";
import { useState } from "react";
import RfidModal from "./rfid-modal";
import { CardType } from "../models/card";
import Close from "@mui/icons-material/Close";

export default function AddCardButton({ onAdd, cards }: { onAdd: (cardId: string) => void, cards: CardType[] }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [errOpen, setErrOpen] = useState(false);

    const onAddCard = (cardId: string) => {
        setOpen(false);
        const isExists = cards.find((val) => val.code == cardId);
        if (isExists) {
            setErrOpen(true);
        }
        else {
            onAdd(cardId);
        }
    }

    const onCloseErr = () => {
        setErrOpen(false);
        setOpen(true);
    }

    return (
        <div>
            <Button startIcon={<AddCircleOutlineIcon />} title={t("person.card.add")} onClick={() => { setOpen(true) }} />

            <Dialog color="error" open={errOpen} onClose={onCloseErr} fullWidth>
                <DialogActions>
                    <Button startIcon={<Close />} color={"error"} onClick={onCloseErr} />
                </DialogActions>

                <div className="-mt-3 px-3">
                    <DialogTitle color={"error"}>{t("errors.error")}</DialogTitle>
                    <DialogContent color={"error"}>{t("errors.cardAlreadyUser")}</DialogContent>
                </div>
            </Dialog>
            {
                open &&
                <RfidModal onClose={() => setOpen(false)} onCard={onAddCard} />
            }
        </div>
    )
}