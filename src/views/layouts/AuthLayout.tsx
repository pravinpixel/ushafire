import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Main from "./utils/Main";
import userStore from "../../zustand/UserZustand";
import Sidebar from "./utils/Sidebar";
import { getLocalStorage } from "../../utils/helpers/storageConfigs";
import { NAV, SESSIONANDLOCAL } from "../../utils/constants";
import { useGetMeApi } from "../../store/hooks/authHooks";
import TaskPopUp from "../components/popupComponents/TaskPopUp";

const AuthLayout = ({ children }: ReactComponentType) => {
	const theme = useTheme();
	const media = useMediaQuery(theme.breakpoints.up("md"));
	const tokens = getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN);
	const { setUser, token } = userStore();

	const navigate = useNavigate();
	const { data } = useGetMeApi();
	const viewUserData = data?.data;

	useEffect(() => {
		if (!token && !tokens) {
			navigate("/auth/login");
		}
	}, [token, navigate, tokens]);

	useEffect(() => {
		if (viewUserData) {
			setUser(viewUserData);
		}
	}, [data, setUser, viewUserData]);

	return (
		<Box sx={{ display: "flex", position: "relative", height: "100%" }}>
			<Box sx={{
				margin: NAV.CHILDMARGIN + "px",
				display: "flex",
				width: "100%",
				borderRadius: "5px",
			}}>
				<Sidebar
					show={media}
				/>
				<Main show={media}>{children}</Main>
			</Box>
			<Box
				sx={{
					position: "absolute",
					bottom: 50,
					right: 40,
					zIndex:2
				}}
			>
				<TaskPopUp />
			</Box>
		</Box>


	);
};

export default AuthLayout;
