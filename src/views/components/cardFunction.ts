import { ChipTypeMap, Palette, SxProps } from "@mui/material";
import dayjs from "dayjs";

export const backgroundChange = ({ tab }: { tab?: TaskPagination["tab"] }, task: TaskFormType) => {
	if (task?.status?.name?.toLowerCase() === "completed") {
		return "#F9F9F9";
	}
	switch (tab) {
		case "archived":
			return "rgba(249, 249, 249, 1)";
		case "assigned_task":
			return "rgba(239, 239, 241, 1)";
		case "my_task":
			return "#FFE1E1";
		default:
			return "#FFE1E1";
	}
};

export const completedTaskChange: (task: TaskFormType, tab: TaskPagination["tab"]) => SxProps = (task, tab) => {
	const status = task?.status?.name?.toLowerCase() || "completed";
	switch (status) {
		case "deleted":
			return {
				background: "rgba(249, 249, 249, 1)",
				borderLeft: "3px solid rgba(153, 153, 153, 1)",
			};
		case "closed":
			return {
				background: "rgba(249, 249, 249, 1)",
				borderLeft: "3px solid rgba(204, 204, 204, 1)",
			};
		case "completed":
			return {
				background: "rgba(249, 249, 249, 1)",
				borderLeft: "3px solid rgba(42, 206, 58, 1)",
			};
		default:
			switch (tab) {
				case "archived":
					return {
						background: "rgba(249, 249, 249, 1)",
					};
				case "assigned_task":
					return {
						background: "#EFEFF1",
					};
				case "my_task":
					return {
						background: "#FFE1E1",
					};
				default:
					return {
						background: "#FFE1E1",
					};
			}
	}
};

export const customizeColor = (dataValue: string, theme: Palette) => {
	switch (String(dataValue).toLowerCase()) {
		case "low":
			return theme.customColor.low;
		case "medium":
			return theme.customColor.medium;
		case "high":
			return theme.customColor.high;
		default:
			break;
	}
};

export const getDueDateCategory = (deadline: Date) => {
	const now: Date = new Date() as never;
	const deadlineDate: Date = new Date(deadline) as never;
	// Reset hours, minutes, seconds, and milliseconds to compare only dates
	now.setHours(0, 0, 0, 0);
	deadlineDate.setHours(0, 0, 0, 0);

	const timeDifference = (deadlineDate as never) - (now as never);
	const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
	const overdueDate = dayDifference - dayDifference * 2;
	if (dayDifference < 0) return "Overdue by  " + overdueDate + " days";
	if (dayDifference === 0) return "Due by today";
	if (dayDifference === 1) return "Due by tomorrow";
	if (dayDifference === 2) return "Due in two days";
	return "Due in " + dayjs(deadlineDate).format("DD MMM YYYY");
};

export const getChipProps = (value: string, data?: TaskPagination) => {
	const chipProps: ChipTypeMap["props"] = {
		label: value,
		variant: "outlined",
		sx: {
			color: "primary",
		},
	};

	if (data?.tab === "archived") {
		chipProps.variant = "filled";
	}

	switch (String(value).toLocaleLowerCase()) {
		case "due by today":
			chipProps.sx = {
				background: ({ palette }) => palette.customColor.organge,
				color: ({ palette }) => palette.common.white,
				border: ({ palette }) => palette.customColor.organge,
			};

			break;
		case "due by tomorrow":
			chipProps.sx = {
				background: ({ palette }) => palette.customColor.blue,
				color: ({ palette }) => palette.common.white,
				border: ({ palette }) => palette.customColor.blue,
			};
			break;
		case "due in two days":
			chipProps.sx = {
				background: ({ palette }) => palette.customColor.red,
				color: ({ palette }) => palette.common.white,
				border: ({ palette }) => palette.customColor.red,
			};
			break;
		default:
			chipProps.sx = {
				background: ({ palette }) => palette.customColor.blue,
				color: ({ palette }) => palette.common.white,
				border: ({ palette }) => palette.customColor.blue,
			};
			break;
	}

	return chipProps;
};

export const getDueStatus = (end?: Date, current: Date = new Date()) => {
	const now: Date = new Date(current as never) as never;
	const deadlineDate: Date = new Date(end as never) as never;
	// Reset hours, minutes, seconds, and milliseconds to compare only dates
	now.setHours(0, 0, 0, 0);
	deadlineDate.setHours(0, 0, 0, 0);

	const timeDifference = (deadlineDate as never) - (now as never);
	const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
	const overdueDate = dayDifference - dayDifference * 2;

	const chipProps: ChipTypeMap["props"] = {
		variant: "outlined",
	};

	if (dayDifference < 0) {
		chipProps.label = "Overdue by  " + overdueDate + " day" + (overdueDate  === 1 ? "" : "s");
		chipProps.sx = {
			background: ({ palette }) => palette.customColor.red,
			color: ({ palette }) => palette.common.white,
			border: ({ palette }) => palette.customColor.red,
		};
	} else if (dayDifference === 0) {
		chipProps.label = "Due by today";
		chipProps.sx = {
			background: ({ palette }) => palette.customColor.organge,
			color: ({ palette }) => palette.common.white,
			border: ({ palette }) => palette.customColor.organge,
		};
	} else if (dayDifference === 1) {
		chipProps.label = "Due by tomorrow";
		chipProps.sx = {
			background: ({ palette }) => palette.customColor.blue,
			color: ({ palette }) => palette.common.white,
			border: ({ palette }) => palette.customColor.blue,
		};
	}

	// else if (dayDifference === 2) {
	// 	chipProps.label = "Due by two days"
	// 	chipProps.sx = {
	// 		background: ({ palette }) => palette.customColor.organge,
	// 		color: ({ palette }) => palette.common.white,
	// 		border: ({ palette }) => palette.customColor.organge,
	// 	}
	// }
	else {
		chipProps.label = "Due in " + dayDifference + " days";
		chipProps.sx = {
			background: ({ palette }) => palette.customColor.blue,
			color: ({ palette }) => palette.common.white,
			border: ({ palette }) => palette.customColor.blue,
		};
	}

	return chipProps;
};

export const  getAgeColor=(age:number)=> {
	switch (true) {
		case (age >= 0 && age <= 14):
			return 'Green';
		case (age >= 15 && age <= 29):
			return 'Orange';
		case (age >= 30):
			return 'Red';
		default:
			return 'Gray';
	}
}
