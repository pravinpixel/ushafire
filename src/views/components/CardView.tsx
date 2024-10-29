import {
	Avatar,
	Badge,
	Box,
	Chip,
	Dialog,
	DialogTitle,
	Divider,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useState } from "react";

import { useCloseTask } from "../../store/hooks/taskHooks";
import { calenderTask, cancel_Icon, clockIcon, close, deleteIcon, mark, tick } from "../../utils/helpers/assetHelper";
import { statusArray } from "../../utils/helpers/globalHelper";
import { fontWeightBold, fontWeightRegular } from "../../utils/theme/typography";
import userStore from "../../zustand/UserZustand";
import CustomButton from "./Button";
import CardComments from "./CardComments";
import { customizeColor, getDueDateCategory, getDueStatus } from "./cardFunction";
import CardMessage from "./CardMessage";
import CompletedTask from "./completedTask/completedTask";
import DateFormatter from "./DateFormat";
import DayState from "./DayState";
import ConfrimPopUp from "./popupComponents/ConfrimPopUp";
import Transition from "./popupComponents/Transition";
import UploadDocs from "./UploadDocs";
import MarkButton from "./MarkButton";
import CompletePopUp from "./popupComponents/CompletePopUp";
import LinkComponent from "./popupComponents/LinkComponent";

type TaskPopUpType = "my-task" | 'self-task'


const statusIcon = (status?: EssentailStatus["name"]) => {
	switch (status) {
		case "mark as completed":
			return {
				icon: tick,
				label: status,
				size: 13,
				sx: {
					color: "#2ACE3A",
				},
			};
		case "completed":
			return {
				icon: tick,
				label: status,
				size: 13,
				sx: {
					color: "#2ACE3A",
				},
			};
		case "closed":
			return {
				icon: close,
				label: status,
				size: 9,
				sx: {
					color: "rgba(83, 83, 83, 1)",
				},
			};
		case "deleted":
			return {
				icon: deleteIcon,
				label: status,
				size: 13,
				sx: {
					color: "rgba(83, 83, 83, 1)",
				},
			};
		default:
			return {
				icon: "",
				label: "",
				size: 0,
				sx: {
					color: "#2ACE3A",
				},
			};
	}
};

const StatusBorder = (taskStatus: string) => {
	switch (taskStatus) {
		case "completed":
			return "3px solid rgba(42, 206, 58, 1)";
		case "closed":
			return "3px solid rgba(204, 204, 204, 1)";
		case "deleted":
			return "3px solid rgba(153, 153, 153, 1)";
		default:
			return ""

	}
}


export const StatusComponent = ({ task }: { task: TaskFormType; condition?: boolean }) => {
	const status = task?.status?.name.toLowerCase();
	const { label = "", icon = "", size, sx } = statusIcon(status as never);
	return (
		<>
			{label ? (
				<Box
					display={"flex"}
					gap={"26px"}
					alignItems={"center"}
				>
					<Box
						display={"flex"}
						gap={1}
						alignItems={"center"}
						marginTop={"5px"}
					>
						{icon && (
							<img
								src={icon}
								alt="logout"
								width={size}
								height={size}
							/>
						)}

						<Typography
							color="#2ACE3A"
							variant="f12"
							sx={{
								fontWeight: fontWeightBold,
								textTransform: "capitalize !important",
								...sx,
							}}
						>
							{label}
						</Typography>
					</Box>
					{task?.status_date && (
						<Box mt={0.75}>
							<Typography
								variant="f12"
								color={"#050505"}
								sx={{
									fontWeight: fontWeightRegular,
									display: "flex",
									gap: "4px",
									alignItems: "center",
								}}
							>
								<img
									src={clockIcon}
									alt="clockIcon"
									width={16}
									height={16}
								/>

								<DateFormatter date={task?.status_date as never} />
							</Typography>
						</Box>
					)}
				</Box>
			) : (
				""
			)}
		</>
	);
};


export default function CardView({
	handleCloseDrawer,
	viewTask,
	params,
}: {
	handleCloseDrawer: () => void;
	viewTask?: TaskFormType;
	params: PaginationType;
}) {
	const { user } = userStore();
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
	const [open, setOpen] = useState<TaskPopUpType | null>(null);
	const [openCancelPopup, setOpenCancelPopup] = useState(false);
	const id = viewTask?.id || null;
	const taskStatus = viewTask?.status?.name || "";

	const handleClose = () => {
		setOpen(null);
	};
	const handleCancel = () => {
		setOpenCancelPopup(false);
	};
	const handleCloseTask = () => {
		setOpenCancelPopup(true);
	};
	const label = getDueDateCategory(viewTask?.date as never);

	const handleCheckState = () => {
		return user?.id !== viewTask?.assigned_by || params?.tab === 'my_task' && viewTask?.is_self_assign === 1;
	};

	const profileToShow: () => TaskFormType["assignedby"] = () => {
		return handleCheckState() ? viewTask?.assignedby : viewTask?.assignedto;
	};

	const showAllButtons = !handleCheckState() && taskStatus?.toLowerCase() === 'inprogress';

	// const checkMarkAsComplete = () => {
	// 	if (!statusArray?.includes(viewTask?.status?.name || "") || viewTask?.mark_as_completed) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	// const checkPending = checkMarkAsComplete() && viewTask?.status?.name === "inprogress";
	// const completeMarkAsCompleted = viewTask?.mark_as_completed
	// 	? "Marked as Completed"
	// 	: viewTask?.status?.name === "completed"
	// 	? "Completed"
	// 	: "";

	const handleCompleteTask = (val: "my-task" | 'self-task') => {
		setOpen(val);
	};
	const { mutateAsync } = useCloseTask();
	
	return (
		<>
			<Box
				sx={{
					backgroundColor: statusArray?.includes(taskStatus.toLowerCase())
						? "rgba(249, 249, 249, 1)"
						: handleCheckState()
							? "#FFE1E1"
							: "#EFEEF0",
				}}
			>
				{handleCheckState()}
				{isXs ? (
					""
				) : (
					<img
						src={cancel_Icon}
						alt="arrow"
						width="10"
						height="10"
						onClick={handleCloseDrawer}
						style={{ cursor: "pointer", marginLeft: "15px" }}
					/>
				)}

				{/* <Box px={'32px'}>
				<ProfileLogo show={isXs} onClick={()=>{}} />
				</Box> */}
				{viewTask ?
					(<Box
						sx={{
							paddingInline: isXs ? "24px" : "50px",
							paddingBottom: "40px",
							paddingTop: "30px",
							borderBottom: StatusBorder(taskStatus.toLowerCase())
							// taskStatus.toLowerCase() === "completed"
							// 	? `3px solid rgba(42, 206, 58, 1)`
							// 	: "",
						}}
					>
						{

							<Stack
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Stack
									direction={"row"}
									alignItems={"center"}
									gap={isXs ? "0px" : "8px"}
									marginBottom={1}
								>
									{label && taskStatus.toLowerCase() === "inprogress" && (
										<Chip
											{...getDueStatus(
												viewTask?.deadline,
												viewTask?.current_date
											)}
										/>
									)}
									<Badge
										color="warning"
										variant="dot"
										sx={{
											pl: 1.5,
											"& .MuiBadge-dot": {
												background: ({ palette }) =>
													customizeColor(
														viewTask?.priority?.name as string,
														palette
													),
												width: "12px",
												height: "12px",
												borderRadius: "50%"
											},
										}}
									/>
									<Typography
										px={1}
										variant="f12"
										sx={{
											color: "rgba(5, 5, 5, 1)",
											opacity: "50%",
											fontWeight: fontWeightRegular,
										}}
									>
										{viewTask?.priority?.name}
									</Typography>
								</Stack>
							</Stack>
						}

						<Stack
							direction={"column"}
							mt={1}
							flexWrap={"wrap"}
						>
							<Typography
								variant="f12"
								sx={{ color: "rgba(5, 5, 5, 1)", opacity: "50%" }}
							>
								{handleCheckState() ? "Created by" : "Assigned"}
							</Typography>
							<Stack
								direction={"row"}
								gap={'16px'}
								mt={1}
							>
								<Box
									display={"inline-flex"}
									alignItems={"center"}
									gap={"5px"}
								>
									<Avatar
										alt="profile"
										src={profileToShow()?.profile_image}
										sx={{ width: 30, height: 30 }}
									/>
									<Typography
										variant="f12"
										sx={{
											color: "rgba(5, 5, 5, 1)",
											opacity: "50%",
											fontWeight: fontWeightRegular,
										}}
									>
										{profileToShow()?.name}
									</Typography>
								</Box>
								<Box
									display={"inline-flex"}
									alignItems={"center"}
									gap={"5px"}
								>
									<img
										src={calenderTask}
										alt="task-calender"
										width="12"
										height="12.33"
									/>
									<Typography
										variant="f12"
										sx={{
											color: "rgba(5, 5, 5, 1)",
											opacity: "50%",
											fontWeight: fontWeightRegular,
										}}
									>
										<DateFormatter date={viewTask?.created_at as never} />
									</Typography>
								</Box>
							</Stack>
						</Stack>
						<Stack marginTop={2}>
							<Box
								display="flex"
								gap={"15px"}
								alignItems={"center"}
								order={isXs ? 2 : 1}
							>
								<Box display={{ xs: "none", sm: "block" }}>
								<DayState
									date={viewTask?.deadline as never}
									color={
										statusArray?.includes(viewTask?.status?.name || "")
											? "rgba(83, 83, 83, 1)"
											: "rgba(136, 52, 76, 1)"
									}
								/>
								</Box>
								<Typography
									color={"#050505"}
									variant="f16"
									sx={{ fontWeight: fontWeightBold, lineHeight: "24px" }}
								>

									{viewTask?.task_no}&nbsp;-&nbsp;{viewTask?.name}
								</Typography>
							</Box>
						</Stack>
						<Stack
							direction={"row"}
							display={"block"}
							marginTop={2}
						>
							<Typography
								variant="f12"
								sx={{
									color: "rgba(5, 5, 5, 1)",
									opacity: "70%",
									fontWeight: fontWeightRegular,
									lineHeight: "18px",
									'a': {
										textDecoration: "underline",
										color: ({ palette }) => palette.primary.main
									}
								}}
							>

								<LinkComponent text={viewTask?.description} />
							</Typography>
						</Stack>
						<Box
							display="flex"
							gap={2}
						>
							{viewTask?.documents?.map((doc) => (
								<UploadDocs
									document={doc}
									key={doc?.id}
								/>
							))}
						</Box>
                        
						{/* <Divider sx={{ width: "100%", marginTop: 2, marginBottom: 2 }} /> */}
						{!isXs || params?.tab !== 'my_task' ? (
                          <Divider sx={{ width: "100%", marginTop: 2, marginBottom: 2 }} />
                           ) : null}

						<Stack
							direction="row"
							display="flex"
							flexWrap="wrap"
							gap={'24px'}
							marginTop={2}
							marginLeft={{sm:2,xs:0}}
							sx={{
								whiteSpace: "nowrap",
								fontSize: ({ typography }) => typography.fontSizeList.f14,
							}}
						>
							{/* {checkMarkAsComplete() && handleCheckState() && (
							<CustomButton
								loading={false}
								label={"Mark as Completed"}
								startIcon={
									<img
										src={tick}
										alt="logout"
										width={18}
										height={18}
									/>
								}
								sx={{
									color: "#2ACE3A",
									backgroundColor: "#FFFFFF",
									border: "1px solid #2ACE3A",
									padding: "3px 10px",
									"&:hover": {
										color: "#2ACE3A",
										backgroundColor: "#FFFFFF",
										border: "1px solid #2ACE3A",
									},
								}}
							/>
						)} */}

							{/* {checkPending && <CustomButton label="Mark as completed" />} */}

							{
								// taskStatus?.toLowerCase() === "completed" ? (
								// 	<CustomButton
								// 		loading={false}
								// 		label={"Completed"}
								// 		startIcon={
								// 			<img
								// 				src={tick}
								// 				alt="logout"
								// 				width={18}
								// 				height={18}
								// 			/>
								// 		}
								// 		sx={{
								// 			color: "#2ACE3A",
								// 			backgroundColor: "#FFFFFF",
								// 			border: "1px solid #2ACE3A",
								// 			padding: "3px 10px",
								// 			"&:hover": {
								// 				color: "#2ACE3A",
								// 				backgroundColor: "#FFFFFF",
								// 				border: "1px solid #2ACE3A",
								// 			},
								// 		}}
								// 	/>
								// ) :
								taskStatus?.toLowerCase() === "inprogress" && viewTask?.mark_as_completed === 1 ? (
									// <CustomButton
									// 	loading={false}
									// 	label={"Mark as Completed"}
									// 	startIcon={
									// 		<img
									// 			src={tick}
									// 			alt="logout"
									// 			width={18}
									// 			height={18}
									// 		/>
									// 	}
									// 	sx={{
									// 		color: "#2ACE3A",
									// 		backgroundColor: "#FFFFFF",
									// 		border: "1px solid #2ACE3A",
									// 		padding: "3px 10px",
									// 		"&:hover": {
									// 			color: "#2ACE3A",
									// 			backgroundColor: "#FFFFFF",
									// 			border: "1px solid #2ACE3A",
									// 		},
									// 	}}
									// />
									<Box marginTop={1.8} marginRight={3.5}>
										<MarkButton label='Marked as completed' />
									</Box>
								) : (
									<StatusComponent
										task={viewTask}
									// condition={!handleCheckState() && checkMarkAsComplete()}
									/>
								)}

							{showAllButtons && (
								<>{
									isXs ? (
										<Stack  direction={{ xs: 'row'}} spacing={1}  sx={{ width: '100%' }} >
									<CustomButton
										loading={false}
										label="Complete the task"
										type="submit"
										onClick={() => handleCompleteTask(viewTask?.is_self_assign === 0 ? 'my-task' : 'self-task')}
										startIcon={
											<img
												src={mark}
												alt="logout"
												width={14}
												height={14}
											/>
										}
										sx={{
											width: { xs: 'calc(60% - 6px)'},
											padding: 0.6,
										}}
									/>
									<CustomButton
										onClick={handleCloseTask}
										loading={false}
										label="Close the task"
										type="submit"
										startIcon={
											<img
												src={close}
												alt="logout"
												width={12}
												height={12}
											/>
										}
										sx={{
											color: "#373737",
											backgroundColor: "#FFFFFF",
											border: "1px solid #5E576C",
											width: { xs: 'calc(50% - 6px)'},
											padding: 0.6,
											"&:hover": {
												color: "#373737",
												backgroundColor: "#FFFFFF",
												border: "1px solid #5E576C",
											},
										}}
									/>
								</Stack>
									):(
										<>
										<CustomButton
										loading={false}
										label="Complete the task"
										type="submit"
										onClick={() => handleCompleteTask(viewTask?.is_self_assign === 0 ? 'my-task' : 'self-task')}
										startIcon={
											<img
												src={mark}
												alt="logout"
												width={14}
												height={14}
											/>
										}
										sx={{
											width: 160,
											padding: 1,
										}}
									/>
									<CustomButton
										onClick={handleCloseTask}
										loading={false}
										label="Close the task"
										type="submit"
										startIcon={
											<img
												src={close}
												alt="logout"
												width={12}
												height={12}
											/>
										}
										sx={{
											color: "#373737",
											backgroundColor: "#FFFFFF",
											border: "1px solid #5E576C",
											width: 160,
											padding: 1,
											"&:hover": {
												color: "#373737",
												backgroundColor: "#FFFFFF",
												border: "1px solid #5E576C",
											},
										}}
									/>
										</>
									)
								}
									
								</>
							)}
						</Stack>
					</Box>) : (<Box height="50vh" sx={{
						paddingInline: isXs ? "24px" : "50px",
						paddingTop: "30px",
					}}>No data</Box>)}

			</Box>
			<Box
				sx={{
					backgroundColor: "rgba(255, 255, 255, 1)",
					mb: 7,
					overflowY: "auto",
					paddingInline: isXs ? "24px" : "50px",
					paddingBlock: "24px",
				}}
			>
				<CardComments
					taskView={viewTask as never}
					id={id}
				/>
			</Box>
			{!statusArray?.includes(taskStatus?.toLocaleLowerCase() || "") && (
				<Box
					sx={{
						backgroundColor: "#FFFFFF",
						position: "fixed",
						bottom: 0,
						width: isXs ? "100vw" : "50vw",
						borderRadius: "17px 0px 0px 17px",
					}}
				>
					<CardMessage
						taskView={viewTask as never}
						isXs={isXs}
						params={params}
					/>
				</Box>
			)}

			{open === 'my-task' ? (
				<Dialog
					TransitionComponent={Transition}
					onClose={handleClose}
					open={!!open}
					maxWidth={"sm"}
					fullWidth
					fullScreen={isXs}
					sx={{
						" & .MuiDialog-paper": {
							padding: '32px'
						}

					}}
				>
					<Stack
						direction={"row"}
						alignItems={"center"}
						display={"flex"}
					>
						{/* <Box
							onClick={handleClose}
						>
							<img alt="arrow-left" src={arrowLeft} width={24} height={24}/>
						</Box> */}
						<DialogTitle
							color="#88344C"
							sx={{
								fontSize: ({ typography }) => typography.fontSizeList.f20,
								fontWeight: fontWeightBold,
								padding: "0px 10px 5px 2px",
							}}
						>
							Task Review
						</DialogTitle>
					</Stack>
					<Divider sx={{ width: "100%", mt: 2 }} />

					<CompletedTask
						handleClose={handleClose}
						id={id}
					/>
				</Dialog>
			) : (
				open === 'self-task' && (
					<CompletePopUp onClose={handleClose} id={id as never} title="Task Review"
						content="Are you sure you want to Complete the task?" />
				))
			}
			{openCancelPopup && (
				<ConfrimPopUp
					id={id as never}
					deleteApi={mutateAsync as never}
					onClose={handleCancel}
					title="Close the Task"
					content="Are you sure you want to Close the selected Task?"
				/>
			)}
		</>
	);
}
