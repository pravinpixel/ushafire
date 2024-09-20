import { Stack } from "@mui/material";
import { task_logo } from "../../utils/helpers/assetHelper";

export default function LoadingComponent() {
    return (
        <Stack height={'100vh'} width={'100vw'} sx={{
            background: ({ palette }) => palette.primary.main, '& img': {
                width : "100px"
            }
        }} justifyContent={'center'} alignItems={'center'}>
            <img src={task_logo} />
        </Stack>
    )
}