import { Box } from '@mui/material'
import { dateValue, dayValue } from '../../utils/helpers/globalHelper'
import { fontWeightBold, fontWeightRegular } from '../../utils/theme/typography'


const DayState = ({ date, color = "#88344C" }: { date: Date, color: string }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            sx={{ background: "#ffff", borderRadius: "4px" }}
            padding="4px 10px 4px 10px"
            // px={2}
            // py={0.3}
        >
            <div
                style={{
                    fontWeight: fontWeightBold,
                    color: color,
                    fontSize: "12px",
                }}
            >
                {dateValue(date)}
            </div>
            <div
                style={{
                    fontWeight: fontWeightRegular,
                    color: color,
                    fontSize: "12px",
                }}
            >
                {dayValue(date)}
            </div>
        </Box>
    )
}

export default DayState