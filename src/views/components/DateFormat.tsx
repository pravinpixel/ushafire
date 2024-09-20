import dayjs from "dayjs";

const DateFormatter = ({ date }: { date: Date | null }) => {
	const formattedDate = dayjs(date).format("DD MMM YYYY, hh:mm a");
	return <span>{formattedDate}</span>;
};

export default DateFormatter;
