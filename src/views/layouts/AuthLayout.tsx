import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetMeApi } from "../../store/hooks/authHooks";
import { NAV } from "../../utils/constants";
import userStore from "../../zustand/UserZustand";
import TaskPopUp from "../components/popupComponents/TaskPopUp";
import Main from "./utils/Main";
import Sidebar from "./utils/Sidebar";
import LoadingComponent from "../components/LoadingComponent";

const AuthLayout = ({ children }: ReactComponentType) => {
	const theme = useTheme();
	const media = useMediaQuery(theme.breakpoints.up("md"));
	// const tokens = getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN);
	const { setUser } = userStore();

	const navigate = useNavigate();
	const { data, error, isError, isLoading } = useGetMeApi();
	const viewUserData = data?.data;

	useEffect(() => {
		if (isError && error) {
			navigate('/auth/login')
			toast.error((error as { error: string })?.error || "Invalid User")
		}
	}, [isError, error, navigate]);

	useEffect(() => {
		if (viewUserData) {
			setUser(viewUserData);
		}
	}, [data, setUser, viewUserData]);

	if (isLoading) {
		return <LoadingComponent />
	}

	
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
