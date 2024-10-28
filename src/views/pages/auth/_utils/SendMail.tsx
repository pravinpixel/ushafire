import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import InputField from "../../../components/form-fields/InputField";
import CustomButton from "../../../components/Button";
import { useFormContext } from "react-hook-form";
import { useSendMailApi } from "../../../../store/hooks/authHooks";
import { notify } from "../../../../utils/helpers/globalHelper";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

function SendMail() {
	const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));
	const {
		handleSubmit,
		setValue,
		formState: { isSubmitting},
	} = useFormContext<ForgotPassword>();

	const { mutateAsync } = useSendMailApi();

	const handleSendMail = async (values: ForgotPassword) => {
		try {
			const res = await mutateAsync(values);
			setValue("email", res?.data?.email)
			setValue("step", 1);
			notify(res);
		} catch (error) {
			notify(error);
		}
	};

	return (
		<Stack
			sx={{ display: "flex", alignItems: "center" }}
			component={"form"}
			onSubmit={handleSubmit(handleSendMail)}
		>
			<Typography
				variant={isXs ? "f18" : "f32"}
				sx={{ fontWeight: ({ typography }) => typography.fontWeightBold }}
				display="flex"
				justifyContent="center"
				color="#88344C"
				mb={{xs:3,md:5}}
				mt={{xs:5,md:0}}
			>
				Forgot password
			</Typography>
			<Box
				display={"flex"}
				flexDirection={"column"}
				sx={{ width: { xs: "100%", md: "75%" } }}
			>
				<InputField
					name="phone_number"
					label="Phone Number"
					placeholder="Enter your phone number "
					description="Please enter your phone number to receive a OTP(One time password) in Mail."
					size="medium"
				/>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				sx={{ width: { xs: "100%", md: "auto" } }}
				mt={{ xs: 6, md:17.75 }}
				mb={{xs:8,md:'auto'}}
			>
				<CustomButton
					sx={{ width: { xs: "100%", md: "auto" } }}
					type="submit"
					loading={isSubmitting}
					label="Send"
				/>
			</Box>
		</Stack>
	);
}

export default SendMail;
