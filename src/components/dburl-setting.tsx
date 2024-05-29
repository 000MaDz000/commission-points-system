import { Box, CircularProgress, IconButton, Input, Typography } from "@mui/material";
import useTranslation from "../hooks/useTranslation";
import { useEffect, useRef, useState } from "react";
import Db from "../classes/db";
import { ChangeCircle, Save } from "@mui/icons-material";
import { useNavigate } from "react-router";

/**
 * the input can only be changed when click on change button
 * when the change button clicked, it's will be replaced with save button and the input will be focused
 * when blur the input, the save button will be replaced with change button again if the database url not changed
 * if the database url changed, the save button will not take effect
 */
export default function DbUrlSetting() {
    const { t } = useTranslation();
    const [dbUrl, setDbUrl] = useState("");
    const [inputVal, setInputVal] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        Db.getUrl().then((val) => setDbUrl(val as string));
    }, []);

    const onWantChange = () => {
        setIsFocused(true);
        inputRef.current?.focus();
    }

    const onSave = () => {
        // on save the database url
        // will save the database url
        // then redirect to the login page
        Db.setUrl(inputVal).then(() => {
            navigate("/");
        });
    }

    const onBlur = () => {
        // if there is no input value, this means the user clicked on the change button
        // and did not write anything
        // if there is input value equals database url, this mean the user does not changed anything
        // it's just write somthing then backed from it
        // in both, the database url not changed, so will just lock the input again
        if (!inputVal || inputVal === dbUrl) {
            setIsFocused(false);
        }
    }


    return (
        dbUrl ? (
            <div className="[&>*]:w-full flex flex-col gap-2">
                {/* database url setting title */}
                <Typography variant="h5">{t("settings.dburl")}</Typography>

                {/* input, focus button and save buttons */}
                <Box className="flex items-center">
                    <Input
                        value={isFocused ? undefined : dbUrl}
                        defaultValue={isFocused ? inputVal : undefined}
                        onChange={isFocused ? () => setInputVal(inputRef.current?.value as string) : undefined}
                        className="flex-grow" inputRef={inputRef}
                        onBlur={onBlur}

                    />


                    {
                        isFocused ? (
                            <IconButton onClick={onSave}><Save /></IconButton>
                        ) : <IconButton onClick={onWantChange}><ChangeCircle /></IconButton>
                    }
                </Box>
            </div>
        )
            : <CircularProgress />
    )
}