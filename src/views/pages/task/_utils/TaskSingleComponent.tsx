import { Avatar, Badge, Box, Chip, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { MouseEvent } from "react";
import { statusArray } from "../../../../utils/helpers/globalHelper";
import { fontWeightBold, fontWeightRegular } from "../../../../utils/theme/typography";
import userStore from "../../../../zustand/UserZustand";
import { completedTaskChange, customizeColor, getDueStatus } from "../../../components/cardFunction";
import { StatusComponent } from "../../../components/CardView";
import DateFormatter from "../../../components/DateFormat";
import DayState from "../../../components/DayState";
import MarkButton from "../../../components/MarkButton";
import TaskOptionsMenu from "./TaskOptionsMenu";
import LinkComponent from "../../../components/popupComponents/LinkComponent";
import { NotificationIcons, RecurrenceIcons, TaskTimeIcons } from "../../../../utils/theme/svg";
// import UploadDocs from "../../../components/UploadDocs";

type Props = {
	task: TaskFormType;
	params: TaskPagination;
	current_date: Date;
	setOpenDrawer: (id: string) => void;
};

const TaskSingleComponent = React.memo(({ task, params, current_date, setOpenDrawer }: Props) => {
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("md"));
	const user = userStore().user;
	const handleOpenDrawer = (e: MouseEvent<HTMLDivElement>, id?: string) => {
		e.preventDefault;
		e.stopPropagation();
		setOpenDrawer(id as string);
	};

	// const handleCheckState = () => {
	// 	return user?.id !== viewTask?.assigned_by;
	// };
	const checkAssignedTo = () => {
		return user?.id !== task?.assigned_by || params.tab === 'my_task' && task?.is_self_assign === 1;
	};

	const profileToShow: () => TaskFormType["assignedby"] = () => {
		return checkAssignedTo() ? task?.assignedby : task?.assignedto;
	};

	// const age = 3;

	return (
		<>
			<Paper
				variant="task"
				onClick={(e) => handleOpenDrawer(e, task?.id)}
				sx={{
					cursor: "pointer",
					marginTop: "0px !important",
					...completedTaskChange(task, params?.tab),

				}}
			>
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
				>
					<Stack
						direction={"row"}
						alignItems={"center"}
						gap={isXs ? "0px" : "8px"}
						sx={{'& .MuiChip-root':{
							'@media (max-width: 375px)': {
							padding:'0px'
							  }
						}}}
					>
						{task?.status?.name === "inprogress" && (
							<Chip {...getDueStatus(task?.deadline, current_date)} />
						)}

						<Badge
							// {...customizeColor(task?.priority?.name)}
							variant="dot"

							sx={{
								pl: 1.5,

								"& .MuiBadge-dot": {
									width: "12px",
									height: "12px",
									background: ({ palette }) =>
										customizeColor(task?.priority?.name as string, palette),
									borderRadius: "50%"
								},
							}}
						/>
						<Typography
							px={isXs ? 1 : 0.5}
							color={"black"}
							variant="f12"
							fontWeight={fontWeightRegular}
						>
							{task?.priority?.name}
						</Typography>
						{
							task?.is_recurrence === 1 && (
								<Box sx={{ maxWidth: '38px', height: '24px', borderRadius: '40px', padding: '4px 11px 4px 11px', border: '1px solid rgba(226, 226, 226, 1)', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									{/* <img src={ReccurenceIcon} width={11} height={11} alt="reccurence icon" /> */}
									<RecurrenceIcons sx={{width:11,height:11}}/>
								</Box>
							)
						}
					</Stack>
					{/* <Box marginRight={2}>Age:<span style={{color:getAgeColor(age)}}>{age}</span></Box> */}
					{params?.tab !== "archived" && (
						<Box
							display="flex"
							alignItems={"center"}
						>
							{task?.unread ? (
								<Badge
									color="success"
									variant="dot"
									overlap="circular"
									className="bell"
									anchorOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
								>
									{/* <img
										src={notificationIcon}
										alt="login-image"
										width="20"
										height="20"
									/> */}
									<NotificationIcons sx={{width:{xs:16,sm:20},height:20}} />
								</Badge>
							) : (
								// <img
								// 	src={notificationIcon}
								// 	alt="login-image"
								// 	width="20"
								// 	height="20"
								// />
								<NotificationIcons sx={{width:{xs:16,sm:20},height:20}} />
							)}
							{params?.tab === "assigned_task" && <TaskOptionsMenu task={task} />}
						</Box>
					)}
				</Stack>
				<Stack
					direction={"row"}
					mt={"12px"}
					justifyContent={"space-between"}
					flexWrap={"wrap"}
				>
					<Box
						display="flex"
						gap={isXs ? "15px" : "20px"}
						alignItems={"center"}
						order={isXs ? 2 : 1}
					>
						<DayState
							date={task?.deadline as never}
							color={
								statusArray?.includes(task?.status?.name?.toLowerCase() || "")
									? "rgba(83, 83, 83, 1)"
									: "rgba(136, 52, 76, 1)"
							}
						/>
						{/* <Box
							display="flex"
							flexDirection="column"
							alignItems={"center"}
							sx={{ background: "#ffff", borderRadius: "4px" }}
							px={2}
							py={0.3}
						>
							<div
								style={{
									fontWeight: fontWeightBold,
									color: "#88344C",
									fontSize: "12px",
								}}
							>
								{dateValue(task?.date)}
							</div>
							<div
								style={{
									fontWeight: fontWeightRegular,
									color: "#88344C",
									fontSize: "12px",
									textTransform: "uppercase",
								}}
							>
								{dayValue(task?.date)}
							</div>
						</Box> */}
						<Typography
							color={"#050505"}
							sx={{ fontSize: "0.75rem", fontWeight: fontWeightBold }}
						>
							{task?.task_no}&nbsp;-&nbsp;{task?.name}
						</Typography>
					</Box>
					<Box
						display="flex"
						gap={isXs ? "6px" : "15px"}
						alignItems={"center"}
						order={isXs ? 1 : 2}
					>
						<Typography
							variant="f12"
							color={"black"}
						>
							{checkAssignedTo() ? "Created by" : "Assigned to"}
						</Typography>

						<Box
							display={"inline-flex"}
							alignItems={"center"}
							gap={"5px"}
						>
							<Avatar
								alt="profile"
								src={profileToShow()?.profile_image}
								sx={{ width: 28, height: 28 }}
							/>
							<Typography
								variant="f12"
								color={"black"}
								sx={{ fontWeight: fontWeightRegular }}
							>
								{profileToShow()?.name}
							</Typography>
						</Box>
						<Box
							display={"inline-flex"}
							alignItems={"center"}
							gap={"5px"}
						>
							{/* <img
								src={calenderTask}
								alt="task-calender"
								width="16"
								height="16"
							/> */}
							<TaskTimeIcons sx={{width:16,height:16}}/>
							<Typography
								variant="f12"
								color={"black"}
								sx={{ fontWeight: fontWeightRegular }}
							>
								<DateFormatter date={task?.created_at as never} />
							</Typography>
						</Box>
					</Box>
				</Stack>
				<Stack
					direction={"row"}
					mt="12px"
					display={{ xs: "block", sm: "block" }}
				>
					<Typography
						variant="f16"
						color={"black"}
						lineHeight={"21.6px"}
						display={{ xs: "none", sm: "block" }}
					>
						<LinkComponent text={task?.description} />
					</Typography>
					{task?.mark_as_completed && task?.status?.name?.toLowerCase() === "inprogress" ? (
						<Box marginTop={"26px"}  marginLeft={2}>
							<MarkButton label='Marked as completed' />
						</Box>
					) : ''}
				</Stack>
				{/* <Box
					display="flex"
					gap={2}
				>
					{task?.documents?.map((doc) => (
						<UploadDocs
							document={doc}
							key={doc.id}
						/>
					))}
				</Box> */}
				<Box marginLeft={2}>
					<StatusComponent task={task} />
				</Box>
				{/* {task?.status?.name === "completed" || params?.tab === "archived" ? (
					<Box
						display={"flex"}
						gap={"14px"}
						alignItems={"center"}
					>
						<Box
							display={"flex"}
							gap={1}
							alignItems={"center"}
							marginLeft={2}
						>
							<Box>
								<img
									src={tick}
									alt="logout"
									width={18}
									height={18}
								/>
							</Box>
							<Typography
								color="#2ACE3A"
								variant="f14"
								sx={{ fontWeight: fontWeightBold, textTransform: "capitalize" }}
								mt={0.7}
							>
								{task?.status?.name === "completed" }
							</Typography>
						</Box>
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
									width={20}
									height={20}
								/>

								<DateFormatter date={task?.created_at as never} />
							</Typography>
						</Box>
					</Box>
				) : task?.mark_as_completed ? (
					<Stack
						direction={"row"}
						marginTop={2}
						marginBottom={1}
						marginLeft={2}
						alignItems={"center"}
					>
						<Box display="flex">
							<Box>
								<img
									src={tick}
									alt="logout"
									width={18}
									height={18}
								/>
							</Box>

							<Typography
								color="#2ACE3A"
								variant="f14"
								marginLeft={1}
								sx={{
									fontWeight: fontWeightBold,
									whiteSpace: "nowrap",
									mt: { xs: 0.6, sm: 0.8, md: 0.2, lg: 0 },
								}}
							>
								Marked as completed
							</Typography>
						</Box>
					</Stack>
				) : null} */}
			</Paper>

		</>
	);
});

export default TaskSingleComponent;
