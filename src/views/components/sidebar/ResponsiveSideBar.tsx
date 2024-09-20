import { Dialog, Paper, Stack } from "@mui/material";
import { useState } from "react";
import Transition from "../popupComponents/Transition";
import ProfileResponsive from "../profileResponsive";
import ProfileTaskContent from "./ProfileTaskContent";
import ProfileLogo from "./ProfileLogo";





export default function ResponsiveSideBar({ show }: { show: boolean }) {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Stack sx={{
                display: show ? "flex" : "none",
            }} spacing={2}>

                <ProfileLogo onClick={handleOpen} />


                <Paper
                    variant="outlined"
                    sx={{
                        borderRadius: "8px",
                        display: "flex",
                        gap: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: 'space-evenly',
                        marginBottom: '24px !important'
                    }}

                >
                    <ProfileTaskContent />
                </Paper>
                {open && (
                    <Dialog
                        TransitionComponent={Transition}
                        onClose={handleClose}
                        open={open}
                        maxWidth={'md'}
                        fullWidth
                        fullScreen
                        sx={{
                            '& .MuiDialog-paper': {
                                padding: '0px',
                                margin: '0px',
                            },
                        }}
                    >
                        <ProfileResponsive handleClose={handleClose} />
                    </Dialog>
                )}
            </Stack>
        </>
    )
}
