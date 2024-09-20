import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { fontWeightBold } from "../../../../utils/theme/typography";
import InputField from "../../../components/form-fields/InputField";
import { useFormContext } from "react-hook-form";
import { usePasswordResetApi } from "../../../../store/hooks/authHooks";
import CustomButton from "../../../components/Button";
import { notify } from "../../../../utils/helpers/globalHelper";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));
	const {
		handleSubmit,
		formState: { isSubmitting},
	} = useFormContext();

	const { mutateAsync } = usePasswordResetApi();
	const navigate = useNavigate();

	const handlePasswordReset = async (values: ForgotPassword) => {
		try {
			const res = await mutateAsync(values);
			notify(res);
			navigate("/auth/login");
		} catch (error) {
			notify(error);
		}
	};
	return (
		<Stack
			display={"flex"}
			alignItems={"center"}
			component={"form"}
			onSubmit={handleSubmit(handlePasswordReset)}
		>
			<Typography
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				variant={isXs ? "f18":"f32"}
				sx={{ fontWeight: fontWeightBold }}
				color="#88344C"
				mb={{xs:3,md:5}}
				mt={{xs:5,md:0}}
			>
				Create new password
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 3,
					// minWidth:'511px',
					width: { xs: "100%", md: "70%" },
					mb: { md: 5, xs: 3 },
				}}
			>
				<InputField
					name="password"
					label="New password"
					placeholder="Enter your new password "
					type="password"
					size="medium"
				/>
				<InputField
					name="confirm_password"
					label="Confirm password"
					placeholder="Enter your confirm password"
					type="password"
					size="medium"
				/>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				sx={{ width: { xs: "100%", md: "auto" } }}
				mt={{ xs: 4,md:8.75 }}
			>
				<CustomButton
					sx={{ width: { xs: "100%", md: "auto" } }}
					label="Submit"
					loading={isSubmitting}
					type="submit"
				/>
			</Box>
		</Stack>
	);
};

export default ChangePassword;
