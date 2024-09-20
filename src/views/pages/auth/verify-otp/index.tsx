import { Box, FormLabel, Typography, useMediaQuery } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import CustomButton from "../../../components/Button";
import { useTheme } from "@mui/material";
import { fontWeightBold, fontWeightRegular } from "../../../../utils/theme/typography";
const VerifyOtp = () => {
	const [otp, setOtp] = useState("");
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
	const handleChange = (newValue: string) => {
		setOtp(newValue);
	};
	return (
		<>
			<Typography
				variant={isXs ? "f20" : "f32"}
				sx={{ fontWeight: fontWeightBold }}
				color="#88344C"
				mb={3}
			>
				Verify your email
			</Typography>
			<form
				style={{
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
						variant={isXs ? "f12" : "f16"}
						color="#050505"
						mt={1}
						sx={{ opacity: "50%", fontWeight: fontWeightRegular }}
					>
						Please enter the 4 digit OTP sent to{" "}
						<span style={{ fontWeight: "700" }}>ma********@gamil.com </span>
					</Typography>

					<Box mt={3}>
						<MuiOtpInput
							value={otp}
							onChange={handleChange}
							sx={{
								"& .MuiInputBase-root": {
									width: "100%",
								},
							}}
						/>
					</Box>
				</Box>
				<Box
					display="flex"
					justifyContent="flex-end"
					width={{ xs: "100%", md: "75%" }}
					mt={2}
				>
					<Typography
						variant="f16"
						color="#88344C"
						mb={1}
						textAlign="end"
						sx={{ cursor: "pointer" }}
					>
						Resend
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					sx={{ width: { xs: "100%", sm: "auto" } }}
					mt={{ md: 4 }}
				>
					<CustomButton
						sx={{ width: { xs: "100%", sm: "auto" } }}
						label="Verify"
						type="submit"
					/>
				</Box>
			</form>
		</>
	);
};

export default VerifyOtp;
