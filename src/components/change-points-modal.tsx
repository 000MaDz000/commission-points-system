import { Box, Button, TextField } from "@mui/material";
import useTranslation from "../hooks/useTranslation";
import Modal from "./modal";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import PointsContext from "../contexts/points";
import { addPoints } from "../models/points";
import { PersonType } from "../models/person";

export default function ChangePointsModal({ open, onClose, person }: { open: boolean, onClose: () => void, person: PersonType & { _id: string } }) {
    const { t } = useTranslation();
    const [inputValue, changeInputValue] = useState(0);
    const { setPoints } = useContext(PointsContext);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        changeInputValue(parseFloat(e.target.value));
    }

    const onConfirm = () => {
        addPoints(person._id, inputValue).then(() => {
            setPoints(inputValue + person.points)
            onClose();
        });
    }

    return (
        <Modal open={open} title={t("points.forms.change-points")} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <TextField type={"number"} label={t("points.forms.points-number")} className="w-full" onChange={onInputChange} />
                <Box className="bg-slate-100">
                    <Button fullWidth color={"success"} onClick={onConfirm}>{t("points.forms.submit-change")}</Button>
                </Box>
            </div>
        </Modal>
    )
}