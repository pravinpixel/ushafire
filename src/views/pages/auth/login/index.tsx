import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/form-fields/InputField";
import userStore from "../../../../zustand/UserZustand";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { fontWeightBold, fontWeightRegular } from "../../../../utils/theme/typography";
import { useLoginApi } from "../../../../store/hooks/authHooks";
import { setLocalStorage } from "../../../../utils/helpers/storageConfigs";
import { SESSIONANDLOCAL } from "../../../../utils/constants";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import CustomButton from "../../../components/Button";
import { notify } from "../../../../utils/helpers/globalHelper";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../../../../utils/helpers/validation";
import { useTheme } from "@mui/material";

function Login() {
	const navigate = useNavigate();
	const setToken = userStore().setToken;
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down('md'));
	const form = useForm<LoginType>({
		defaultValues: {
			phone_number: "",
			password: "",
		},
		resolver: yupResolver(LoginValidation) as never,
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	const { mutateAsync } = useLoginApi();

	const handleFormSubmit = async (values: LoginType) => {
		try {
			const res = await mutateAsync(values);
			setToken(res?.data?.token);
			navigate("/task");
			setLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN, res?.data?.token || "");
			notify(res);
		} catch (error) {
			notify(error);
		}
	};
	return (
		<FormProvider {...form}>
			<Typography
				variant={isXs ? "f18" : "f32"}
				sx={{ fontWeight: fontWeightBold }}
				color="#88344C"
				textAlign={"center"}
				mb={{xs:4,md:5}}
				maxWidth={"443px"}
				minHeight={'43px'}
				mt={{xs:5,md:0}}
			>
				Login with your email address
			</Typography>
			<Box
				component={"form"}
				onSubmit={handleSubmit(handleFormSubmit)}
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					// minWidth:'511px',
					minWidth: { xs: "100%", md: "70%" },
				}}
			>
				<Stack
					direction={"column"}
					gap={{ xs: 2, md: 3 }}
				>
					<InputField
						name="phone_number"
						label="Phone Number"
						placeholder="Enter your phone number "
						size="medium"
					/>
					<InputField
						name="password"
						label="Password"
						placeholder="Enter your password"
						type="password"
						size="medium"
					/>

				</Stack>
				<Box
					display={"flex"}
					justifyContent={"flex-end"}
				>
					<Link to={"/auth/forgot-password"}>
						<Typography
							variant="f16"
							color="#88344C"
							mb={3}
							mt={2}
							textAlign="end"
							sx={{ cursor: "pointer", fontWeight: fontWeightRegular }}
						>
							Forgot Password ?
						</Typography>
					</Link>
				</Box>
				<Stack
					justifyContent={"center"}
					alignItems={"center"}
					mt={{xs:3,md:5}}
				>
					<CustomButton
						type="submit"
						sx={{ width: { xs: "100%", md: "auto" } }}
						loading={isSubmitting}
						label="Sign in"
					/>
				</Stack>
			</Box>
		</FormProvider>
	);
}

export default Login;
