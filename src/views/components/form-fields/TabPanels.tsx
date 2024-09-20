import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from "react";
import SearchFilter from "../SearchFilter.tsx/SearchFilter";
import ResponsiveSideBar from "../sidebar/ResponsiveSideBar";
import ProgressBar from "../ProgressBar";
import { fontWeightMedium } from "../../../utils/theme/typography";

type TabListType = {
	label: string;
	value: string;
	component: ReactNode | JSX.Element;
};

const TabPanels = ({
	tabList = [],
	params,
	setParams,
	isLoading = false,
}: {
	tabList: TabListType[];
	params: TaskPagination;
	setParams: Dispatch<SetStateAction<TaskPagination>>;
	isLoading?: boolean;
}) => {
	const theme = useTheme();
	const media = useMediaQuery(theme.breakpoints.down("md"));
	const handleChange = (e: SyntheticEvent, tab: TaskPagination["tab"]) => {
		e.preventDefault();
		setParams(() => ({
			tab,
			page:0,
			per_page: 20,
			search : null,
			deadline :[],
			priority_id : [],
			sort_column : null
		}));
	};

	return (
		<>
			<ResponsiveSideBar
				show={media}
			/>
			<Tabs
				value={params?.tab}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
				sx={{
					borderBottom: "1px solid #88344C",
				}}
			>
				{tabList?.map(({ label, value }) => {
					return (
						<Tab
							label={label}
							value={value}
							key={value}
							sx={{
								minWidth: "15%",
								color: '#000000',
								fontWeight:fontWeightMedium,
								// "&.Mui-selected": {
								// 	backgroundColor: "#88344C",
								// 	whiteSpace: "nowrap",
								// 	width: { xs: "40%", sm: "30%", md: "15%" },
								// 	color: "#FFFFFF",
								// 	borderRadius: "8px 8px 0px 0px",
								// },
							}}
						/>
					);
				})}
			</Tabs>

			<SearchFilter
				params={params}
				setParams={setParams}
			/>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				gap: "20px"
			}}>
				{
					isLoading ? <ProgressBar /> : tabList?.map(({ value, component }) => {
						return params?.tab === value ? component : "";
					})
				}
			</Box>

		</>
	);
};

export default TabPanels;
