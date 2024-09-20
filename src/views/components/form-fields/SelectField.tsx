import { MenuItem, Typography } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Box } from "@mui/material";
import { Select } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { DownArrowTask } from "../../../utils/theme/svg";

// const CustomSelectIcon = styled("div")({
// 	display: "flex",
// 	alignItems: "center",
// 	justifyContent: "center",
// 	width: 13,
// 	height: 6,
// 	background: `url(${selectArrow})`,
// 	backgroundSize: "contain",
// 	backgroundRepeat: "no-repeat",
// 	backgroundPosition: "center",
// 	position: "relative",
// 	transform: "translateX(-12px) translateY(6px)",
// });

const renderValue = (label: string, value?: string) => {
	return !value ? {
		renderValue: () => <Typography
			sx={{
				color: '#050505',
				opacity: '50%',
				padding: "0px"
			}}
			variant="f16"
			fontWeight={400}
		>
			{`Select ${label}`}
		</Typography>
	} : {}
}

const SelectField = (props: {
	label: string;
	name: string;
	options?: EssentailTypeListResponse[];
	disabledArray?: string[]
}) => {
	const { label, name, options = [] , disabledArray} = props;
	const { control } = useFormContext();
	const {
		field,
		fieldState: { error },
	} = useController({
		control,
		name,
		defaultValue: null,
	});
	const dropDowns = options || [];

	const errorMessage = error?.message;
	return (
		<>
			<Box sx={{
				'& .MuiSelect-select': {
					padding: "5px 14px !important"
				}
			}}>
				<FormLabel>{label}</FormLabel>
				<Select
					size="small"
					sx={{ mt: 1, width: "100%" ,
                      "& .MuiSvgIcon-root":{
						width:'19px',
						height:'19px',
						right:'11px',
						top:'calc(50% - 0.35em)',
					  }
					}}
					{...field}
					variant="outlined"
					error={!!errorMessage}
					displayEmpty
					IconComponent={DownArrowTask}
					MenuProps={{
						sx: {
							"& ul": {
								maxHeight: "150px",
								overflow: "auto",
							}
						}
					}}
					{...renderValue(label, field?.value || "")}
				>
					{dropDowns?.map((d) => (
						<MenuItem
							disabled={disabledArray?.includes(String(d?.id))}
							value={String(d?.id)}
							key={d?.id}
						>
							{d?.name}
						</MenuItem>
					))}
				</Select>
				{errorMessage && <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>}
			</Box>
		</>
	);
};

export default SelectField;
