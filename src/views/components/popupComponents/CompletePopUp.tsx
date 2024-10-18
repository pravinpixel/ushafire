import { Box, Dialog, Divider, Typography } from "@mui/material";
import { useState } from "react";
import Transition from "./Transition";
import { Stack } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { fontWeightBold, fontWeightMedium } from "../../../utils/theme/typography";
import CustomButton from "../Button";
import { Button } from "@mui/material";
import { useStatusUpdate } from "../../../store/hooks/taskHooks";
import { notify } from "../../../utils/helpers/globalHelper";

const CompletePopUp = (props:any) => {
    const { id, onClose ,title,content}=props;
    const [open, setOpen] = useState(id ? true : false);
	const [loading, setLoading] = useState(false);
    const handleClose = () => {
		setOpen(false);
		onClose && onClose()
	};
    const { mutateAsync } = useStatusUpdate(id);
	const handleFormSubmit = async () => {
		setLoading(true);
		try {
			const data = {
                task_rating: 0,
                rating_remark: '',
				status: 'completed' as never
			}
			const res = await mutateAsync(data)
			notify(res)
			onClose && onClose()
		} catch (error) {
			notify(error)
		}finally {
			setLoading(false);
		}
	}
  return (
    <div>
      	<Box>
			{open && (
				<Dialog
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
					}}
					sx={{
						padding: 5,
					}}
					TransitionComponent={Transition}
					onClose={handleClose}
					open={open}
				>
					<Stack
						direction={"row"}
						alignItems={"center"}
					>
						{/* <Box
							sx={{ cursor: "pointer" }}
							onClick={handleClose}
						>
							<img
								alt="arrow-left"
								src={arrowLeft}
								width={24}
								height={24}
							/>
						</Box> */}
						<DialogTitle color="#88344C"
							sx={{
								fontSize: ({ typography }) => typography.fontSizeList.f18,
								fontWeight: fontWeightBold,
								padding: "2px 1px",
							}}>{title}</DialogTitle>
					</Stack>
					<Divider sx={{width:'100%',}} />
					<Typography color="#050505" sx={{my:2,fontWeight:fontWeightMedium,fontSize: ({ typography }) => typography.fontSizeList.f20,}}>{content}</Typography>
					<Stack
						direction={"row"}
						spacing={5}
						display={'flex'}
						justifyContent={'center'}
					>
						<CustomButton
							label="Yes"
							loading={loading}
							onClick={handleFormSubmit}
							sx={{ padding: '5px 12px' }} 
						/>
						<Button sx={{ padding: '5px 12px' }}  onClick={handleClose}>No</Button>
					</Stack>
				</Dialog>
			)}
		</Box>
    </div>
  )
}

export default CompletePopUp
