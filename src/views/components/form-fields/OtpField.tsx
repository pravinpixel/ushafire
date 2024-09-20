import { FormHelperText } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useController, useFormContext } from "react-hook-form";

function OtpField() {
	const { control } = useFormContext();
	const { field, fieldState: { error } } = useController({
		name: "token",
		defaultValue: "",
		control,
	});
	return (
		<>
			<MuiOtpInput
			TextFieldsProps={{ placeholder: '_' }}
				length={4}
				{...field}
				sx={{
					"& .MuiInputBase-root": {
						width: "100%",
					},
					"& input": {
						textAlign: "center",
						width:'100%',
						"&::placeholder": {
							color: "rgba(0, 0, 0, 0.2)", 
							fontSize: "2.5rem",
							textAlign: "center", 
							fontWeight: 100, 
						},
					},
					
				}}
			/>
			<FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
		</>
	);
}

export default OtpField;
