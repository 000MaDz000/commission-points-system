import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import useTranslation from "../hooks/useTranslation";
import { useState } from "react";
import RfidModal from "./rfid-modal";
import { CardType } from "../models/card";
import Close from "@mui/icons-material/Close";
import { AddCircle } from "@mui/icons-material";

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
        <Tooltip title={t("card.addCard")}>
            <div>
                <IconButton onClick={() => { setOpen(true) }}>
                    <AddCircle />
                </IconButton>

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
        </Tooltip>
    )
}