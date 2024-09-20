import { FormLabel, IconButton, InputAdornment, Stack, TextField, TextFieldProps, Typography, useMediaQuery } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { fontWeightRegular } from "../../../utils/theme/typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material";

type InputFieldType = TextFieldProps & {
	description?: string;
	mb?: number
};

function InputField(props: InputFieldType) {
	const { name = "", label, placeholder, description, multiline = false, rows, size = "small", sx, type, mb } = props;
	const {
		control,
	} = useFormContext();
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down('sm'));
	const { field, fieldState: { error } } = useController({
		control,
		name,
		defaultValue: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const errorMessage = error?.message
	return (
		<Stack sx={{
			'& .MuiIconButton-root:hover': {
				background: "#f2dde3 !important"
			}
		}}>
			<FormLabel sx={{ mb: mb ? mb : 2 }}>{label}</FormLabel>
			{description && (
				<Typography
					variant={isXs ? "f12" : "f16"}
					color="#050505"
					sx={{ opacity: "50%", fontWeight: fontWeightRegular, mb: 2 }}
				>
					{description}
				</Typography>
			)}
			<TextField
				fullWidth
				{...field}
				placeholder={placeholder}
				multiline={multiline}
				rows={rows}
				size={size}
				error={!!errorMessage}
				helperText={errorMessage}
				sx={sx}
				type={showPassword ? "text" : type}
				InputProps={{
					endAdornment: type === "password" && (
						<InputAdornment position="end">
							<IconButton
								onClick={handleTogglePasswordVisibility}
								sx={{ background: 'none', color: 'gray' }}
							>
								{showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					),
				}}

			/>
		</Stack>
	);
}

export default InputField;
