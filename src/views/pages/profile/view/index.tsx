import { Avatar, Badge, Box, Stack, styled, Typography } from "@mui/material"
import { arrow, logout1 } from "../../../../utils/helpers/assetHelper"
import { fontWeightBold, fontWeightMedium } from "../../../../utils/theme/typography"
import CustomButton from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useGetMeApi } from "../../../../store/hooks/authHooks";
import RatingSidebar from "../../../components/sidebar/RatingSidebar";


const SmallAvatar = styled(Avatar)(() => ({
  width: 22,
  height: 22,
  border: `2px solid #FFFFFF`,
  top: '52px',
  right: '5px'
}));

const LargeAvatar = styled(Avatar)(() => ({
  width: 90,
  height: 90,
  border: '4px solid #FFFFFF',
  top: '50px'
}));

const UserTableContent = ({ label, value }: { label: string, value?: string }) => {
  return <Stack direction={'row'} justifyContent="space-between" >
    <Typography sx={{ fontSize: ({ typography }) => typography.fontSizeList.f14, fontWeight: fontWeightMedium }} color="#050505">{label}</Typography>
    <Typography sx={{ fontSize: ({ typography }) => typography.fontSizeList.f18, fontWeight: fontWeightBold }} color="#000000">{value}</Typography>
  </Stack>
}

const UserSection = ({ profileView }: { profileView: LoginType }) => {
  return <>
    <Stack >
      <UserTableContent label={'First name'} value={profileView?.name} />
      <UserTableContent label={'Last name'} value={profileView?.name} />
      <UserTableContent label={'Email'} value={profileView?.email} />
      <UserTableContent label={'Mobile'} value={profileView?.phone_number} />
      <UserTableContent label={'Designation'} value={profileView?.designation?.name} />
    </Stack>
  </>
}

const ProfileView = () => {

  const navigate = useNavigate();
  const {data} = useGetMeApi();
  const profileView = data?.data as LoginType;

  const handleIconClick=()=>{
    navigate('/')
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#88344C",
          height: '30vh',
          borderRadius: "0px 0px 40px 40px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '20px',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          marginBottom={2}
        >
          <img src={arrow} alt="arrow" width="20" height="5" onClick={handleIconClick}/>
          <Typography sx={{ fontSize: ({ typography }) => typography.fontSizeList.f20, fontWeight: fontWeightBold }}>
            User profile
          </Typography>
        </Stack>

        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <SmallAvatar alt="Remy Sharp" src={profileView?.profile_image} />
          }
        >
          <LargeAvatar alt="Travis Howard" src={profileView?.profile_image} />
        </Badge>



      </Box>
      <Stack marginTop={7}>
        <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography sx={{ fontSize: ({ typography }) => typography.fontSizeList.f14, fontWeight: fontWeightMedium }} color="#050505">Rating</Typography>
        <RatingSidebar value={profileView?.rating_count || 0}/>
        </Stack>
        <UserSection profileView={profileView} />
      </Stack>
      <Stack marginTop={15}>
      <CustomButton
					loading={false}
					label="Log out"
					type="submit"
					fullWidth
					startIcon={<img src={logout1} alt="logout" width="18" height="18" />}
				/>
        </Stack>
    </>
  )
}

export default ProfileView
