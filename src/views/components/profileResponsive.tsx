import { Avatar, Badge, Box, Container, Stack, styled, Typography } from "@mui/material";

import { useLogoutApi } from "../../store/hooks/authHooks";
import { arrow, avatarImage, logout1 } from "../../utils/helpers/assetHelper";
import { fontWeightBold, fontWeightMedium } from "../../utils/theme/typography";
import userStore from "../../zustand/UserZustand";
import CustomButton from "./Button";
import RatingSidebar from "./sidebar/RatingSidebar";
import { useState } from "react";
import Transition from "./popupComponents/Transition";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Divider } from "@mui/material";
import ChangePassword from "./popupComponents/ChangePassword";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const SmallAvatar = styled(Avatar)(() => ({
  width: '24px',
  height: '24px',
  top: '52px',
  right: '5px'
}));

const LargeAvatar = styled(Avatar)(() => ({
  width: '120px',
  height: '120px',
  border: '4px solid #FFFFFF',
  top: '50px'
}));

const UserTableContent = ({ label, value }: { label: string, value?: string }) => {
  return <Stack direction={'row'} justifyContent="space-between" >
    <Typography variant="f12" sx={{ fontWeight: fontWeightMedium }} color="#050505">{label}</Typography>
    <Typography variant="f16" sx={{ fontWeight: fontWeightBold ,width:"65%",textAlign:"end" }} color="#000000">{value}</Typography>
  </Stack>
}

const UserSection = ({ profileView }: { profileView?: LoginType }) => {
  return <>
    <Stack >
      <UserTableContent label={'First name'} value={profileView?.first_name} />
      <UserTableContent label={'Last name'} value={profileView?.last_name} />
      <UserTableContent label={'Email'} value={profileView?.email} />
      <UserTableContent label={'Mobile'} value={profileView?.phone_number} />
      <UserTableContent label={'Designation'} value={profileView?.designation?.name} />
    </Stack>
  </>
}

const ProfileResponsive = (props: { handleClose: () => void }) => {
  const { handleClose } = props;
  const profileView = userStore().user
  const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
	const handleCloses = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
  const { mutateAsync, isLoading } = useLogoutApi()

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#88344C",
          height: '200px',
          borderRadius: "0px 0px 40px 40px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          marginBottom={2}
          marginTop="12px"
        >
          <img src={arrow} alt="arrow" width="20" height="5" onClick={handleClose} />
          <Typography variant="f20" sx={{ fontWeight: fontWeightBold }}>
            User profile
          </Typography>
        </Stack>

        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <SmallAvatar alt="Remy Sharp" src={avatarImage} />
          }
        >
          <LargeAvatar alt="Travis Howard" src={profileView?.profile_image} />
        </Badge>

      </Box>
      <Container>
        <Stack marginTop={8}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant="f12" sx={{ fontWeight: fontWeightMedium }} color="#050505">Rating</Typography>
            <RatingSidebar value={profileView?.rating_count} />
          </Stack>
          <UserSection profileView={profileView} />
        </Stack>
        <Stack mt={2}>
        <Box onClick={handleOpen} mt={1}>
				<Typography variant="f16"  sx={{textDecoration:'underline',cursor:'pointer',color:'#050505',fontWeight: fontWeightMedium}} lineHeight={'20px'} >Change password</Typography>
			</Box>
        </Stack>
        <Stack marginTop={15}>
          <CustomButton
            loading={isLoading}
            label="Log out"
            fullWidth
            onClick={() => mutateAsync()}
            startIcon={<img src={logout1} alt="logout" width="18" height="18" />}
          />
        </Stack>

        
			{open && (
				<Dialog
					TransitionComponent={Transition}
					onClose={handleCloses}
					open={open}
					maxWidth={"sm"}
					fullWidth
					fullScreen={isXs}
					sx={{
						" & .MuiDialog-paper": {
							padding: '32px'
						}

					}}
				>
					<Stack
						direction={"row"}
						alignItems={"center"}
						display={"flex"}
					>
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
					<Divider sx={{ width: "100%", mt: 1.5 }} />

					<ChangePassword
						handleClose={handleCloses}
					/>
				</Dialog>
			)}
      </Container>
    </>
  )
}

export default ProfileResponsive
