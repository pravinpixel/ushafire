import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { NoTaskLogo } from '../../../../utils/helpers/assetHelper'

const NoTask = () => {
    const theme = useTheme()
    const isResponsive = useMediaQuery(theme?.breakpoints?.down('md'))
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: `calc(100vh - ${isResponsive ? 400 : 190}px)`,
            width: "100%",
            marginBottom:isResponsive ? "200px" : "0px"

        }}>

            <img src={NoTaskLogo} height={isResponsive ? "60px" : "77px"} width={isResponsive ? "71px" :"91px"} />
            <Typography sx={{
                color: "rgba(222, 222, 222, 1)",
                fontSize: isResponsive ? "26px !important" : "40px !important",
                lineHeight: 1.2,
            
            }}>It takes good effort to begin <br /> and a great effort to <br /> complete a task.</Typography>
        </Box>
    )
}

export default NoTask