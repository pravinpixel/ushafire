import { Box, FormLabel, Typography, useMediaQuery } from "@mui/material";



import { useFormContext } from "react-hook-form";
import OtpField from "../../../components/form-fields/OtpField";
import CustomButton from "../../../components/Button";
import { useVerifyOtpApi } from "../../../../store/hooks/authHooks";
import { fontWeightBold, fontWeightRegular } from "../../../../utils/theme/typography";
import { notify } from "../../../../utils/helpers/globalHelper";
import ResendOtp from "./ResendOtp";
import { useTheme } from "@mui/material";

const VerifyOtp = () => {
	const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));
	const {
		handleSubmit,
		setValue,
		watch,
		formState: { isSubmitting },
	} = useFormContext<ForgotPassword>();

	const { mutateAsync } = useVerifyOtpApi();

	const handleVerifyOtp = async (values: ForgotPassword) => {
		try {
			const res = await mutateAsync(values);
			notify(res);
			setValue("step", 2);
		} catch (error) {
			notify(error);
		}
	};

	const convertStar = () => {
		const email = watch("email") || "";
		const username = email.substring(0, email.indexOf("@")); 
		const maskedUsername = username.substring(0, 2) + "*****"; 
		const domain = email.substring(email.indexOf("@"));
		return maskedUsername + domain;
		// const phone = watch("phone_number") || ""; 
		// const phoneStr = Array.isArray(phone) ? phone.join('') : phone.toString(); 
		// const visibleDigits = 4;
		// const maskedPart = "*".repeat(phoneStr.length - visibleDigits); 
		// const lastPart = phoneStr.substring(phoneStr.length - visibleDigits); 
		// return maskedPart + lastPart;
	};

	return (
		<>
			<Typography
				variant={isXs ? "f18":"f32"}
				sx={{ fontWeight: fontWeightBold }}
				color="#88344C"
				mb={{xs:3,md:5}}
				mt={{xs:4,md:0}}
			>
				Verify your email
			</Typography>
			<Box
				component={"form"}
				onSubmit={handleSubmit(handleVerifyOtp)}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="flex-start"
					width={{ xs: "100%", md: "75%" }}
				>
					<FormLabel>One time password</FormLabel>
					<Typography
						variant={isXs ? "f12":"f16"}
						color="#050505"
						mt={2}
						mb={2}
						fontWeight={fontWeightRegular}
						sx={{ opacity: "50%" }}
						whiteSpace={'nowrap'}
					>
						Please enter the 4 digit OTP sent to{" "}
						<span style={{ fontWeight: "700" }}>{convertStar()} </span>
					</Typography>
					<OtpField />
				</Box>
				<ResendOtp />
				<Box
					display="flex"
					justifyContent="center"
					sx={{ width: { xs: "100%", md: "auto" } }}
					mt={{ xs: 6,md:13 }}
					mb={{xs:'148px',md:'auto'}}
				>
					<CustomButton
						sx={{ width: { xs: "100%", md: "auto" } }}
						label="Verify"
						loading={isSubmitting}
						type="submit"
					/>
				</Box>
			</Box>
		</>
	);
};

export default VerifyOtp;
