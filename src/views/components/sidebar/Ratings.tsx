import Rating from "@mui/material/Rating";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { RatingStarEmptyPopupIcon, RatingStarPopupIcon} from "../../../utils/theme/svg";

export default function Ratings({ readonly = false, name }: { readonly?: boolean; name: string }) {
	const { control } = useFormContext();
	const {
		field: { value, onChange },fieldState:{error}
	} = useController({
		name,
		defaultValue: 0,
		control,
	});
	const errorMessage = error?.message
	return (
	<>
		<Rating
			value={value}
			readOnly={readonly}
			size="small"
			onChange={(_event: React.SyntheticEvent, newValue: number | null) => {
				onChange(newValue);
			}}
			icon={<RatingStarPopupIcon sx={{marginRight: "8px" }} />}
			emptyIcon={<RatingStarEmptyPopupIcon sx={{ marginRight: "8px" }}/>}
		/>
		{errorMessage && (
			<p style={{ color: "#f48498", fontSize: "12px", marginTop: "4px" }}>
			  {errorMessage}
			</p>
		  )}
		  </>
	);
}
