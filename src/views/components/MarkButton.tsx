import { Box } from "@mui/material";
import { tick } from "../../utils/helpers/assetHelper";
import { Typography } from "@mui/material";
import { fontWeightBold } from "../../utils/theme/typography";


export default function MarkButton({label}:{label:string}) {
    return (
        <>
            <Box
                display={"flex"}
                gap={1}
                alignItems={"center"}
                justifyContent={"flex-start"}
            >
                <img
                    src={tick}
                    width={20}
                    height={20}
                />

                <Typography
                    color="#2ACE3A"
                    variant="f12"
                    sx={{ fontWeight: fontWeightBold, lineHeight: "16.2px" }}
                >
                    {label}
                </Typography>
            </Box>
        </>
    )
}
