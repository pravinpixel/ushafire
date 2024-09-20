import { Box, Divider, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { fontWeightBold } from "../../utils/theme/typography";
import userStore from "../../zustand/UserZustand";
import SingleComment from "./SingleComment";

export default function CardComments({ taskView }: { taskView: TaskFormType; id?: string | null }) {
	const user = userStore().user;
	// const [params, setParams] = useState({
	// 	page: 1,
	// 	per_page: 20,
	// });
	// const { data, isLoading } = useTaskCommentsList(id, params);

	// const [comments, setComments] = useState<TaskComment[]>([]);

	const condition = taskView?.comments && taskView?.comments?.length > 0;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// const datas = data?.data?.data || [];

	// useEffect(() => {
	// 	if (datas?.length > 0) {
	// 		setComments((state) => {
	// 			const array = [...state, ...datas];
	// 			const returnArray = array.filter(
	// 				(obj1, i, arr) => arr.findIndex((obj2) => obj2.id === obj1.id) === i
	// 			);
	// 			return returnArray;
	// 		});
	// 	}
	// }, [datas]);

	return (
		<>
			<Box
				// marginTop="24px"
				marginBottom={user?.id === taskView?.assigned_to ? "140px" : "90px"}
			>
				<Typography
					color="#000000"
					variant="f20"
					sx={{ fontWeight: fontWeightBold }}
				>
					Recent comments
				</Typography>
				{condition ? (
					<Fragment>
						{taskView?.comments?.map((value) => (
							<Fragment key={value.id}>
								<SingleComment
									comment={value}
									taskView={taskView}
								/>
								<Divider
									sx={{
										width: "100%",
										marginTop: "16px",
									}}
								/>
							</Fragment>
						))}
						{/* {isLoading || comments?.length < (data?.data?.total as never) && (
							<Box
								sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
								marginBlock={3.5}
							>
								<CustomButton
									label="Load More"
									type="submit"
									loading={isLoading}
									onClick={() => {
										setParams((state) => {
											return {
												...state,
												page: state.page + 1,
											};
										});
									}}
									fullWidth
									sx={{
										paddingBlock: 2,
										height: "25px",
										width: "30px",
										whiteSpace: "nowrap",
									}}
								/>
							</Box>
						)} */}
					</Fragment>
				) : (
					<Stack marginBottom={"20px"}>
						<Typography
							color="#000000"
							variant="f14"
							sx={{ fontWeight: fontWeightBold }}
						>
							No Comments
						</Typography>
					</Stack>
				)}

				{/* <Button
					variant="contained"
					color="primary"
					sx={{
						position: "fixed",
						top: '73%',
						// right: '20%',
						
					}}
				>
					Fixed Button
				</Button> */}
			</Box>
		</>
	);
}
