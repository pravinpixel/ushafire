import { Box } from "@mui/material"
import Linkify from "linkify-react"

const LinkComponent = ({ text = '' }) => {
    const handleLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLAnchorElement;
        if (target.tagName.toLowerCase() === 'a' && target.href) {
            event.preventDefault();
            event.stopPropagation();
            window.open(target.href, '_blank', 'noopener,noreferrer');
        }
    }
    return (
        <Box className="link_anchor_tag" sx={{wordBreak:'break-all'}} 
        onClick={handleLinkClick}
        >
            <Linkify options={{
                target: "_blank",
                attributes:{
                    onClick: (event: React.MouseEvent) => event.stopPropagation()
                }
            }}>
                {String(text)}
            </Linkify>
        </Box>
    )
}

export default LinkComponent