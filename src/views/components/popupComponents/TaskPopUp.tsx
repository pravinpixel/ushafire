import AddIcon from "@mui/icons-material/Add";
import { Box, Dialog, DialogTitle, Divider, IconButton, Stack, useMediaQuery, useTheme } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTaskListView } from "../../../store/hooks/taskHooks";
import { arrowLeft } from "../../../utils/helpers/assetHelper";
import { fontWeightBold } from "../../../utils/theme/typography";
import TaskForm from "../../pages/task/_utils/TaskForm";
import Transition from "./Transition";
import { DialogProps } from "@mui/material";
import { ArrowLeftIcons } from "../../../utils/theme/svg";


const TaskPopUp = ({ id, onClose, handleTaskClose }: { id?: TaskFormType['id'] | null, onClose?: () => void, handleTaskClose?: () => void }) => {
	const [open, setOpen] = useState(id ? true : false);
	const theme = useTheme();
	const isXsScreen = useMediaQuery(theme.breakpoints.down("md"));
	const handleClose: DialogProps['onClose'] = (_, reason) => {
		if (reason && (reason === "backdropClick")) {
			return
		}
		setOpen(false);
		handleTaskClose && handleTaskClose()
		onClose && onClose()
	};


	const { data } = useTaskListView(id)

	// 	const defaultValue = id
	//   ? data?.data 
	//   : {  
	// 	is_recurrence: 0 
	//     };
	const defaultValue = data?.data

	const handleOpen = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent> | MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation()
		setOpen(true);

		onClose && onClose()
	};

	return (
		<Box>
			{!id && <IconButton sx={{
				width: { xs: '50px', md: "80px" },
				height: { xs: '50px', md: "80px" },
			}} onClick={(e) => handleOpen(e)}>
				<AddIcon sx={{
					height: "37px",
					width: "37px"
				}} />
			</IconButton>}

			{open && (
				<Dialog
					TransitionComponent={Transition}
					onClose={handleClose}
					open={open}
					maxWidth={"md"}
					fullWidth

					onClick={(e) => {
						e.stopPropagation()
					}}
					sx={{
						zIndex: 11,
						" & .MuiDialog-paper": {
							padding: '32px'
						}
					}}
					fullScreen={isXsScreen}

				>
					<Stack
						direction={"row"}
						alignItems={"center"}
						display={"flex"}
					>
						<Box
							sx={{ cursor: "pointer" }}
							onClick={handleClose as never}
						>
							{/* <img
								alt="arrow-left"
								src={arrowLeft}
								width={24}
								height={24}
							/> */}
							<ArrowLeftIcons sx={{width:20,height:20}}/>
						</Box>
						<DialogTitle
							color="#88344C"
							sx={{
								fontSize: ({ typography }) => typography.fontSizeList.f20,
								fontWeight: fontWeightBold,
								padding: "5px 15px",
							}}
						>
							{id ? "Edit" : "Create"} Task
						</DialogTitle>
					</Stack>
					<Divider sx={{ width: "100%", mt: 2 }} />
					<TaskForm
						handleClose={handleClose as never}
						defaultValues={defaultValue}
						key={defaultValue?.id}
					/>

				</Dialog>
			)}
		</Box>
	);
};

export default TaskPopUp;
