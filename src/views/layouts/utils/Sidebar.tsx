import { Box, Dialog, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useLogoutApi } from "../../../store/hooks/authHooks";
import { NAV } from "../../../utils/constants";
import { notify } from "../../../utils/helpers/globalHelper";
import userStore from "../../../zustand/UserZustand";
import CustomButton from "../../components/Button";
import CircularProgressBar from "../../components/sidebar/ProgressBar";
import RatingSidebar from "../../components/sidebar/RatingSidebar";
import { CircularProgress } from "@mui/material";
import Transition from "../../components/popupComponents/Transition";
import { DialogTitle } from "@mui/material";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { fontWeightBold } from "../../../utils/theme/typography";
import ChangePassword from "../../components/popupComponents/ChangePassword";
import { Logout, TaskMasterLogoIcons } from "../../../utils/theme/svg";

const UserTableContent = ({
  name,
  id,
}: {
  name?: string;
  id?: string | number;
}) => {
  return (
    id && (
      <Stack
        direction={"row"}
        justifyContent="space-between"
        sx={{
          "& .MuiTypography-root": {
            overflow: "visible !important",
            wordBreak: "break-word",
            display: "block",
          },
        }}
      >
        <Typography
          variant="f14"
          color={"#FFFFFF80"}
          fontWeight={({ typography }) => typography.fontWeightRegular}
          width={"75px"}
        >
          {name}
        </Typography>
        <Typography
          variant="f14"
          fontWeight={({ typography }) => typography.fontWeightMedium}
          width={"183px"}
          textAlign={"end"}
          minHeight={"20px"}
        >
          {id}
        </Typography>
      </Stack>
    )
  );
};

const UserTaskContent = ({ data }: { data?: LoginType }) => {
  // console.log(data,'pendingtask')
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <CircularProgressBar progressValue={data?.task_percentage || 0} />
      <Typography
        variant={"f14"}
        fontWeight={700}
        color={"white"}
        lineHeight={"18.9px"}
        mt={0.8}
      >
        You have {data?.pending_task || 0} task to complete
      </Typography>
      <Typography variant={"f12"} lineHeight={"16.2px"} mt={0.4}>
        You’ve made it halfway! Keep going strong
      </Typography>
    </Stack>
  );
};

const UserSection = ({ userData }: { userData?: LoginType }) => {
  return (
    <>
      <Stack alignItems="center">
        <Avatar
          alt="Profile_logo"
          src={userData?.profile_image}
          sx={{ width: 56, height: 56 }}
        />
        <Stack alignItems="center" mt={1}>
          <RatingSidebar value={userData?.rating_count || 0} />
          <Typography
            variant="f18"
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Hi {userData?.first_name} {userData?.last_name}!
          </Typography>
          <Typography variant="f12" color={"#FFFFFF80"}>
            {"It's time to mark those tasks as complete!"}
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <UserTableContent name={"First name"} id={userData?.first_name} />
        <UserTableContent name={"Last name"} id={userData?.last_name} />
        <UserTableContent name={"Email"} id={userData?.email} />
        <UserTableContent name={"Mobile"} id={userData?.phone_number} />
        <UserTableContent
          name={"Designation"}
          id={userData?.designation?.name}
        />
      </Stack>
    </>
  );
};

const Sidebar = ({ show }: { show: boolean }) => {
  const navigate = useNavigate();

  const { user: userData } = userStore();

  const { mutateAsync, isLoading } = useLogoutApi();

  const handleLogout = async () => {
    try {
      const response = await mutateAsync();
      notify(response);
      navigate("/auth/login");
    } catch (error) {
      notify(error);
    }
  };
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "5px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: NAV.WIDTH,
        display: show ? "flex" : "none",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Stack alignItems="center">
        {/* <img src={task_logo} alt="login-image" width="33" height="46"></img> */}
        <TaskMasterLogoIcons sx={{width:33,height:46}} />
        <Typography variant="f20" lineHeight={"25.27px"}>
          Task Master
        </Typography>
        <Divider sx={{ width: "100%" }} />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 1.5,
        }}
      >
        <UserSection userData={userData} />
        <Divider sx={{ width: "100%", mb: 1.5 }} />
        <UserTaskContent data={userData} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Divider sx={{ width: "100%" }} />
        <CustomButton
          onClick={() => handleLogout()}
          label={isLoading ? "" : "Log out"}
          type="submit"
          variant="white"
          fullWidth
          sx={{
            mt: 1.5,
          }}
          startIcon={
            <>
              {isLoading ? (
                <CircularProgress sx={{ color: "#88344C" }} size={"20px"} />
              ) : (
                // <img
                // 	src={logout}
                // 	alt="logout"
                // 	width="18"
                // 	height="18"
                // />
                <Logout />
              )}
            </>
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          width: "100%",
        }}
        onClick={handleOpen}
        mt={1}
      >
        <Typography
          variant="f16"
          textAlign={"end"}
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          lineHeight={"20px"}
          fontWeight={500}
        >
          Change password
        </Typography>
      </Box>

      {open && (
        <Dialog
          TransitionComponent={Transition}
          onClose={handleClose}
          open={open}
          maxWidth={"sm"}
          fullWidth
          fullScreen={isXs}
          sx={{
            " & .MuiDialog-paper": {
              padding: "32px",
            },
          }}
        >
          <Stack direction={"row"} alignItems={"center"} display={"flex"}>
            {/* <Box
							onClick={handleClose}
						>
							<img alt="arrow-left" src={arrowLeft} width={24} height={24}/>
						</Box> */}
            <DialogTitle
              color="#88344C"
              sx={{
                fontSize: ({ typography }) => typography.fontSizeList.f20,
                fontWeight: fontWeightBold,
                padding: "0px 10px 5px 2px",
              }}
            >
              Change password
            </DialogTitle>
          </Stack>
          <Divider sx={{ width: "100%", mt: 2 }} />

          <ChangePassword handleClose={handleClose} />
        </Dialog>
      )}
    </Paper>
  );
};

export default Sidebar;
