import { Delete, ChangeCircle } from "@mui/icons-material";
import { TableRow, TableCell, Tooltip, IconButton, Dialog, DialogTitle, Typography, DialogContent, DialogActions, DialogContentText, Button, Box } from "@mui/material";
import { OneCardsType } from "./cards-table";
import useTranslation from "../hooks/useTranslation";
import PeapleTable, { Peaple } from "./peaple-table";
import { useState } from "react";
import Modal from "./modal";

type CardRowProps = {
    card: OneCardsType,
    onDeleteCard: (card: OneCardsType) => void,
    onChangeCardOwner: (person: Peaple, card: OneCardsType) => void
}


export default function CardRow({ card, onChangeCardOwner, onDeleteCard }: CardRowProps) {
    const { t } = useTranslation();
    const [selectPerson, setSelectPerson] = useState<boolean>(false);
    const [deleteSureDialog, setDeleteSureDialog] = useState(false);

    const onSelectPerson = (person: Peaple) => {
        setSelectPerson(false);
        onChangeCardOwner(person, card);
    }

    const onWantDelete = () => {
        if (!deleteSureDialog) return setDeleteSureDialog(true);

        onDeleteCard(card);
    }

    return (
        <TableRow >
            <TableCell sx={{ textAlign: "center" }}>{card.person?.name || t("card.noOwner")}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{card.code.toString()}</TableCell>
            <TableCell sx={{ textAlign: "center" }} dir="rtl">{card.addedAt.toLocaleDateString()}</TableCell>

            {/* delete the card */}
            <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title={t("card.data.deleteCard")} onClick={onWantDelete}>
                    <IconButton color="warning" >
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>

            {/* update the card owner */}
            <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title={t("card.data.changePerson")}>
                    <IconButton onClick={() => setSelectPerson(true)}>
                        <ChangeCircle />
                    </IconButton>
                </Tooltip>
            </TableCell>

            {selectPerson ? (
                <Modal open onClose={() => setSelectPerson(false)}>
                    <PeapleTable hover onSelectPerson={onSelectPerson} />
                </Modal>
            ) : ""
            }

            {
                deleteSureDialog && (
                    <Dialog color={"warning"} open onClose={() => setDeleteSureDialog(false)} fullWidth>

                        <DialogTitle className="text-yellow-700">
                            {t("card.data.deleteCard")}
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                are you sure you want delete the card ?
                            </DialogContentText>



                            <div className="flex justify-evenly items-center mt-6">
                                <Tooltip title={t("card.owner")}>
                                    <Typography>
                                        {card.person?.name || t("card.noOwner")}
                                    </Typography>
                                </Tooltip>

                                <Tooltip title={t("card.data.id")} >
                                    <Typography marginTop={2}>
                                        {card.code}
                                    </Typography>
                                </Tooltip>
                            </div>

                        </DialogContent>




                        <DialogActions>
                            <Button color={"error"} onClick={onWantDelete}>{t("dialogs.delete.yesOrNo.Yes")}</Button>
                            <Button color={"secondary"} onClick={() => setDeleteSureDialog(false)}>{t("dialogs.delete.yesOrNo.No")}</Button>
                        </DialogActions>
                    </Dialog>
                )
            }
        </TableRow >
    )
}