import { Box, Checkbox, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

type CheckboxProps = {
	label: string;
	name: string;
};

const CustomCheckbox: React.FC<CheckboxProps> = ({ label, name }) => {
	const { control } = useFormContext();
	const { field } = useController({
		control,
		name,
		defaultValue: 0,
	});
	return (
		<Box
			display={"flex"}
			alignItems={"center"}
			sx={{
				'svg' : {
					height : "18px",
					width : "18px",
				}
			}}
		>
			<Checkbox
				{...field}
				// icon={<img
				// 	src={checkIcon}
				// 	alt="checkIcon"
				// 	width="18"
				// 	height="18"

				// />}
				// checkedIcon={<img
				// 	src={checkIconFill}
				// 	alt="checkIconFill"
				// 	width="18"
				// 	height="18"

				// />}
				sx={{
					marginTop: 0.8,
					
				}}
				checked={field?.value === 1}
				onChange={(e) => {
					field?.onChange(e?.target?.checked ? 1 : 0)
				}}
			/>
			<Typography
				marginLeft={1}
				sx={{color:"rgba(0, 0, 0, 1)"}}
				variant="f14"
			>
				{label}
			</Typography>
		</Box>
	);
};

export default CustomCheckbox;
