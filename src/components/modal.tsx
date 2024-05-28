import { HTMLAttributes, PropsWithChildren } from "react";
import { Box, Button, Modal as MuiModal } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function Modal(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & { onClose: () => void, open: boolean }) {
    return (
        <MuiModal open={props.open} onClose={props.onClose}>
            <div className="m-4 flex w-full h-full justify-center items-center">
                <Box className="bg-white p-4 min-w-80 max-w-[45rem] w-2/3 flex flex-col gap-1">
                    <Box className="flex justify-between items-center mt-2 mb-4">
                        <h1>{props.title || ""}</h1>
                        <Button startIcon={<Close />} color={"error"} onClick={props.onClose}></Button>
                    </Box>

                    <Box className="">
                        {props.children}
                    </Box>
                </Box>
            </div>
        </MuiModal>
    )
}