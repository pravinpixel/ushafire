import { Avatar, Box, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { fontWeightBold, fontWeightRegular } from "../../utils/theme/typography";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import UploadDocs from "./UploadDocs";
import userStore from "../../zustand/UserZustand";
dayjs.extend(RelativeTime);
dayjs.extend(utc)
dayjs.extend(timezone)
const getTimeZone = dayjs.tz.guess() 
const SingleComment = ({ comment , taskView}: { comment: TaskComment; taskView?: TaskFormType }) => {
	const user = userStore().user;
	

	const checkTime = dayjs.tz(comment?.created_at, getTimeZone)
	const fromNow = dayjs.tz(taskView?.current_date, getTimeZone)
	return (
		<>
			<Stack
				direction="row"
				marginTop="24px"
				spacing={2}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Avatar
						alt="profile"
						src={comment?.from?.profile_image}
						sx={{ width: 40, height: 40 }}
					/>
				</Box>
				<Stack>
					<Typography
						color="#000000"
						variant="f16"
						lineHeight='21.17px'
						sx={{ fontWeight: fontWeightBold }}
						mb={'2px'}
					>
						{user?.id === comment?.from_id
							? `You (${comment?.from?.first_name || ""})`
							: comment?.from?.first_name || ""}
					</Typography>
					<Typography
						color="#050505"
						variant="f12"
						lineHeight='16.2px'
						sx={{ fontWeight: fontWeightRegular, opacity: "50%" }}
					>
						{dayjs(checkTime).from(fromNow)}
					</Typography>
				</Stack>
			</Stack>
			<Stack direction={"row"} gap={2}>
				{comment?.documents?.length > 0
					? comment.documents?.map((doc) => <UploadDocs document={doc} />)
					: null}
			</Stack>

			<Box marginTop="12px">
				<Typography
					color="#050505"
					variant="f12"
					sx={{ fontWeight: fontWeightRegular, lineHeight: "16.2px" }}
				>
					{comment?.comment}
				</Typography>
			</Box>
		</>
	);
};

export default SingleComment;

// import { Avatar, Box, Typography } from "@mui/material";
// import { Stack } from "@mui/material";
// import { fontWeightBold, fontWeightRegular } from "../../utils/theme/typography";
// import dayjs from "dayjs";
// import RelativeTime from "dayjs/plugin/relativeTime";
// import UploadDocs from "./UploadDocs";
// import userStore from "../../zustand/UserZustand";
// dayjs.extend(RelativeTime);
// const SingleComment = ({ task }: { task: TaskComment; taskView?: TaskFormType }) => {
// 	const user = userStore().user;

// 	return (
// 		<>
// 			<Stack
// 				direction="row"
// 				marginTop="24px"
// 				spacing={2}
// 			>
// 				<Box
// 					sx={{
// 						display: "flex",
// 						flexDirection: "row",
// 						alignItems: "center",
// 					}}
// 				>
// 					<Avatar
// 						alt="profile"
// 						src={task?.fromid?.profile_image}
// 						sx={{ width: 40, height: 40 }}
// 					/>
// 				</Box>
// 				<Stack>
// 					<Typography
// 						color="#000000"
// 						variant="f16"
// 						sx={{ fontWeight: fontWeightBold }}
// 					>
// 						{user?.id === task?.from_id
// 							? `You (${task.from?.first_name || ""})`
// 							: task?.to?.first_name || ""}
// 					</Typography>
// 					<Typography
// 						color="#050505"
// 						variant="f12"
// 						sx={{ fontWeight: fontWeightRegular, opacity: "50%" }}
// 					>
// 						{dayjs(task.created_at).fromNow()}
// 					</Typography>
// 				</Stack>
// 			</Stack>
// 			<Stack direction={"row"}>
// 				{task?.documents?.length > 0
// 					? task.documents?.map((doc) => <UploadDocs document={doc} />)
// 					: null}
// 			</Stack>

// 			<Box marginTop="12px">
// 				<Typography
// 					color="#050505"
// 					variant="f12"
// 					sx={{ fontWeight: fontWeightRegular, lineHeight: "16.2px" }}
// 				>
// 					{task?.comment}
// 				</Typography>
// 			</Box>
// 		</>
// 	);
// };

// export default SingleComment;
