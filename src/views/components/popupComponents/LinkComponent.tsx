import { Box } from "@mui/material"
import Linkify from "linkify-react"

const LinkComponent = ({ text = '' }) => {
    return (
        <Box className="link_anchor_tag" onClick={(e) => {
            e.stopPropagation()
        }}>
            <Linkify options={{
                target: "_blank",
            }}>
                {String(text)}
            </Linkify>
        </Box>
    )
}

export default LinkComponent