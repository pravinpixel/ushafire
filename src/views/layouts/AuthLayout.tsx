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
import { toast } from "sonner";

const AuthLayout = ({ children }: ReactComponentType) => {
	const theme = useTheme();
	const media = useMediaQuery(theme.breakpoints.up("md"));
	const tokens = getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN);
	const { setUser, token } = userStore();

	const navigate = useNavigate();
	const { data, error } = useGetMeApi();
	const viewUserData = data?.data;

	useEffect(() => {
		if (!token && !tokens && error) {
			navigate("/auth/login");
			toast.error((error as { error: string })?.error || 'Invalid User')
		}
	}, [token, navigate, tokens, error]);

	useEffect(() => {

	}, [error])

	useEffect(() => {
		if (viewUserData) {
			setUser(viewUserData);
		}
	}, [data, setUser, viewUserData]);

	return (
		<Box sx={{
			display: "flex", position: "relative", height: "100%", overflow: "hidden",
			'& ::-webkit-scrollbar': { width: 0, background: 'transparent' },
			'&': { scrollbarWidth: 'none' }
		}}>
			<Box sx={{
				padding: NAV.CHILDMARGIN + "px",
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
					position: "fixed",
					bottom: 50,
					right: 40,
					zIndex: 2
				}}
			>
				<TaskPopUp />
			</Box>
		</Box>


	);
};

export default AuthLayout;
