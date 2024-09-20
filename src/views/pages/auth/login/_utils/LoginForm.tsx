
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { loginImage } from "../../../../../utils/helpers/assetHelper";



const LoginPage = () => {

	return (
		<Box
			sx={{
				my: 8,
				mx: 4,
				display: "flex",
				flexDirection: "column",
				width: "100%",
				maxWidth: 850,
				justifyContent: "space-around",
			}}
			component="form"
		>
			<Stack
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Avatar
					src={loginImage}
					sx={{
						width: "max-content",
						height: "6.3125rem",
					}}
					variant="square"
				/>
				<Typography
					component="h1"
					mt={5}
					variant="h5"
				>
					Sign In with your credentials
				</Typography>
				
				<LoadingButton
					loading={false}
					type="submit"
					variant="contained"
					sx={{ mt: 3, mb: 2, borderRadius: 0, height: "3rem", width: "7rem" }}
				>
					Sign In
				</LoadingButton>
			</Stack>
		</Box>
	);
};

export default LoginPage;
