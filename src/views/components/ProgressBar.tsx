import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";


export default function ProgressBar() {
  return (
    <Box sx={{display:"flex",justifyContent:'center',alignItems:'center',height:'50vh'}}>
        <CircularProgress sx={{color:"#88344C"}}/>
    </Box>
  )
}

