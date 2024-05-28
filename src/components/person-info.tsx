import { Button, DialogTitle } from "@mui/material";
import useTranslation from "../hooks/useTranslation";
import { PersonType } from "../models/person";
import { useState } from "react";
import ChangePointsModal from "./change-points-modal";

export default function PersonInfo({ person }: { person: PersonType }) {
    const { t } = useTranslation();
    const [isChangePointsOpened, setChangePointsOpened] = useState(false);

    return (
        <div className="grid grid-cols-[2fr,1fr] gap-2 [&>div]:p-2">
            <div className="flex flex-col gap-2 [&>div]:flex [&>div]:justify-between w-full bg-red-50">

                <div>
                    <h4>{t("person.data.name")}:</h4>
                    <h3>{person.name}</h3>
                </div>

                <div>
                    <h4>{t("person.data.birthDate")}:</h4>
                    <h3>
                        <span>{person.birthDate.getDate()}</span>/
                        <span>{person.birthDate.getMonth()}</span>/
                        <span>{person.birthDate.getFullYear()}</span>
                    </h3>

                </div>

                <div>
                    <h4>{t("person.data.age")}:</h4>
                    <h4>{new Date().getFullYear() - person.birthDate.getFullYear()}</h4>
                </div>

                <div>
                    <h4>{t("person.data.gender")}:</h4>
                    <h4>{person.gender}</h4>
                </div>

                <div>
                    <h4>{t("person.data.phone")}:</h4>
                    <h4>{person.phone}</h4>
                </div>
            </div>

            <div className="bg-slate-100 flex flex-col justify-evenly">
                <div className="flex justify-between gap-6">
                    <h4 className="text-nowrap">{t("person.data.nationalId")}:</h4>
                    <h4>{person.nationalId}</h4>
                </div>

                <DialogTitle className="flex justify-between gap-6">
                    <h4 className="text-nowrap">{t("person.data.points")}:</h4>
                    <Button size={"large"} onClick={() => setChangePointsOpened(true)}>{person.points}</Button>
                </DialogTitle>
            </div>

            <ChangePointsModal open={isChangePointsOpened} onClose={() => setChangePointsOpened(false)} person={person as PersonType & { _id: string }} />
        </div>
    )
}
