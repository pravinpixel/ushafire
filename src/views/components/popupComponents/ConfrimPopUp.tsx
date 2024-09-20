import { Box, Button, Dialog, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Transition from "./Transition";
import CustomButton from "../Button";
import { notify } from "../../../utils/helpers/globalHelper";
import { fontWeightBold, fontWeightMedium } from "../../../utils/theme/typography";
type ConfrimPopUpType = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	deleteApi: (id?: string) => Promise<void>;
	id?: string;
	title: string;
	content: string;
	onClose?: () => void
};

const ConfrimPopUp = ({ deleteApi, id, onClose ,title,content }: ConfrimPopUpType) => {
	const [open, setOpen] = useState(id ? true : false);
	const [loading, setLoading] = useState(false);

	const handleClose = () => {
		setOpen(false);
		onClose && onClose()
	};

	const handleDelete = async () => {
		setLoading(true);
		try {
			const res= await deleteApi(id);
			notify(res)
			onClose && onClose()
		} catch (error) {
			notify(error)
		} finally {
			setLoading(false);
		}
	};

	return (
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
							onClick={handleDelete}
							sx={{ padding: '5px 12px' }} 
						/>
						<Button sx={{ padding: '5px 12px' }}  onClick={handleClose}>No</Button>
					</Stack>
				</Dialog>
			)}
		</Box>
	);
};

export default ConfrimPopUp;
