
import { Box, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { taskUrl, useTaskList } from "../../../../store/hooks/taskHooks";
import CustomButton from "../../../components/Button";
import TabPanels from "../../../components/form-fields/TabPanels";
import NoTask from "../_utils/NoTask";
import TaskSingleComponent from "../_utils/TaskSingleComponent";
import TaskViewDrawer from "../_utils/TaskViewDrawer";
import dayjs from "dayjs";

const TaskComponent = ({
	taskList,
	params,
	setParams,
	isFetching = false,
	isLoading = false,
	isLoadMoreLoading = false,
	current_date,
	showLoadMore,
	setOpenDrawer,
	handleLoadMore
}: {
	taskList: TaskFormType[];
	params: TaskPagination;
	setParams: React.Dispatch<React.SetStateAction<TaskPagination>>;
	current_date: Date;
	showLoadMore?: boolean;
	isFetching?: boolean;
	isLoading?: boolean;
	setOpenDrawer: any;
	isLoadMoreLoading?: boolean;
	handleLoadMore?: any
}) => {
	const currentYear = dayjs().year();


	return (
		<>
			{taskList?.length > 0 ? (
				<Stack gap={"20px"} mb={{ lg: 10, xs: 20, sm: 12, md: 12 }}>
					{taskList.map((task) => (
						<TaskSingleComponent
							params={params}
							task={task}
							key={task?.id}
							current_date={current_date}
							setOpenDrawer={setOpenDrawer}
						/>
					))}
					{showLoadMore && (
						<Box
							sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
						>
							<CustomButton

								label={isLoadMoreLoading ? "" : "Load More"}
								type="submit"
								fullWidth
								onClick={handleLoadMore}
								sx={{
									paddingBlock: 2,
									whiteSpace: "nowrap",
									height: "30px",
									width: "30px",
								}}
								startIcon={
									<>
										{isLoadMoreLoading && (
											<CircularProgress sx={{ color: "white" }} size={'20px'} />
										)}
									</>
								}
							/>


						</Box>
					)}
				</Stack>
			) : (
				<NoTask />
			)}

			<Box
				sx={{
					textAlign: "center",
					position: "fixed",
					bottom: 0,
					background: "white",
					fontSize: "13px",
					fontWeight: 400,
					boxShadow: "1",
					zIndex: 1,
					py: "15px",
					pr: "15px",
				}}
			>
				&copy; {currentYear} Usha Fire Safety. All Rights Reserved. Task Master is
				a proprietary application developed by Usha Fire Safety for enhancing
				workplace task management. Unauthorized use, distribution, or reproduction
				of the application and its content is strictly prohibited. For more
				information, please contact us at{" "}
				<a href="mailto:enquiry@ushafire.in" className="mail">enquiry@ushafire.in</a>
			</Box>
		</>
	);
};

const ListTask = React.memo(() => {
	const [searchParams] = useSearchParams();
	const viewTaskId = searchParams.get("view_task_id");
	const [openDrawer, setOpenDrawer] = useState<TaskFormType["id"] | null>(
		viewTaskId || null
	);

	const [params, setParams] = useState<TaskPagination>({
		page: 0,
		per_page: 20,
		tab: "my_task",
		search: null,
		priority_id: [],
		deadline: [],
		sort_column: null,
	});


	const [taskList, setTaskList] = useState<TaskFormType[]>([]);
	const [totalValue, setTotalValue] = useState();
	const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
	const { data, isLoading } = useTaskList(params);

	const cardDetails = data?.data?.data || [];
	const total = data?.data?.total || 0;
	const current_date = data?.data?.current_date || new Date();

	const showLoadMore = taskList.length < totalValue;
	const navigate = useNavigate();
	const refecthQuery = useQueryClient();

	useEffect(() => {
		if (data) {
			// const existingIds = new Set(taskList.map(task => task.id));
			// const newTasks = cardDetails.filter(task => !existingIds.has(task.id));
			setTaskList(cardDetails);
			setIsLoadMoreLoading(false);
			setTotalValue(total);
		}
	}, [data]);

	

	useEffect(() => {
		setTaskList([]);
	}, [params.tab]);

	const handleCloseDrawer = () => {
		setOpenDrawer(null);
		refecthQuery.refetchQueries([taskUrl]);
		navigate("/task");
	};
	const handleLoadMore = () => {
		setIsLoadMoreLoading(true);
		setParams((values) => ({
			...values,
			per_page: values?.per_page + 20,
		}));
	};
	const tabList = useMemo(() => {
		return [
			{
				label: "My Task",
				component: (
					<>
						<TaskComponent
							key={params["tab"]}
							taskList={taskList as never}
							params={params}
							setParams={setParams}
							current_date={current_date}
							showLoadMore={showLoadMore}
							isLoading={isLoading && taskList.length === 0}
							setOpenDrawer={setOpenDrawer}
							isLoadMoreLoading={isLoadMoreLoading}
							handleLoadMore={handleLoadMore}
						/>
					</>
				),
				value: "my_task",
			},
			{
				label: "Assigned",
				component: (
					<>
						<TaskComponent
							key={params["tab"]}
							taskList={taskList as never}
							params={params}
							current_date={current_date}
							setParams={setParams}
							showLoadMore={showLoadMore}
							isLoading={isLoading && taskList.length === 0}
							setOpenDrawer={setOpenDrawer}
							isLoadMoreLoading={isLoadMoreLoading}
							handleLoadMore={handleLoadMore}
						/>
					</>
				),
				value: "assigned_task",
			},
			{
				label: "Archives",
				component: (
					<TaskComponent
						key={params["tab"]}
						taskList={taskList as never}
						params={params}
						setParams={setParams}
						current_date={current_date}
						showLoadMore={showLoadMore}
						isLoading={isLoading && taskList.length === 0}
						setOpenDrawer={setOpenDrawer}
						isLoadMoreLoading={isLoadMoreLoading}
						handleLoadMore={handleLoadMore}
					/>
				),
				value: "archived",
			},
		];
	}, [taskList, current_date, params]);

	return (
		<Stack>
			<TabPanels params={params} setParams={setParams} tabList={tabList} isLoading={isLoading && taskList.length === 0} />
			{openDrawer && (
				<TaskViewDrawer handleCloseDrawer={handleCloseDrawer} openDrawer={openDrawer} />
			)}
		</Stack>
	);
});

export default ListTask;
