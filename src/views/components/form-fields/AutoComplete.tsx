import { Autocomplete, Box, FormLabel, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { DownArrowTask } from "../../../utils/theme/svg";


const AutoCompleteField = (props: {
	label: string;
	name: string;
	options?: EssentailTypeListResponse[];
	disabledArray?: string[]
}) => {
	const { label, name, options = [], disabledArray = [] } = props;
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
					padding: "7px 14px !important"
				},
				'& .MuiIconButton-root': {
					background: 'none !important',
					color: 'rgba(5, 5, 5, 1)'
				},


			}}>
				<FormLabel>{label}</FormLabel>
				<Autocomplete
					value={dropDowns.find(option => option.id === field.value) || null}
					onChange={(_, newValue) => {
						field.onChange(newValue ? newValue.id : null);
					}}
					onBlur={field.onBlur}
					options={dropDowns}
					getOptionLabel={(option) => option.name || ""}
					getOptionDisabled={(option) => disabledArray?.includes(String(option.id))}
					renderInput={(params) => (
						<TextField
							{...params}
							error={!!errorMessage}
							helperText={errorMessage}
							variant="outlined"
							size="small"
							placeholder="Enter task assignee name"

						/>
					)}
					size="small"
					renderOption={(props, option) => (
						<li {...props}>
							{option.name}
						</li>
					)}
					sx={{
						width: '100%', mt: 1, 
					}}
					popupIcon={
						<DownArrowTask sx={{ width: 19, margin: 0.2 }} />

					}
				/>
			</Box>
		</>
	);
};

export default AutoCompleteField;
