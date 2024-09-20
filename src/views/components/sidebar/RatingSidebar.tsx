import { Rating } from "@mui/material";

import { RatingStarEmptyIcon, RatingStarIcon } from "../../../utils/theme/svg";


const RatingSidebar = ({ value = 0 }: { value?: number }) => {
	return (
		<Rating
			name="simple-controlled"
			value={value}
			readOnly={true}
			precision={0.1}
			size="small"
			icon={<RatingStarIcon />}
			emptyIcon={<RatingStarEmptyIcon />}
		/>
	);
};

export default RatingSidebar;
