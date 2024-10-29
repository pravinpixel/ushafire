import { Avatar, Stack, Typography } from '@mui/material'
import userStore from '../../../zustand/UserZustand'
import RatingSidebar from './RatingSidebar'
import { fontWeightBold, fontWeightRegular } from '../../../utils/theme/typography'

const ProfileLogo = ({ onClick, show = true }: { onClick: () => void,show?:boolean }) => {
    const user = userStore().user
    return <>
    {
        show ?  <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Avatar
            alt="Profile_logo"
            src={user?.profile_image}
            sx={{ width: 56, height: 56 }}
            onClick={onClick}
        />
        <Stack >
            <Typography variant="f20" color={"#88344C"} sx={{ fontWeight: fontWeightBold }}>Hi {user?.first_name} {user?.last_name}!</Typography>
            <RatingSidebar value={user?.rating_count || 0} />
            <Typography variant="f16" color={'#05050580'} sx={{ fontWeight: fontWeightRegular,lineHeight:'20px' }}>{"It's time to mark those tasks as complete!"}</Typography>

        </Stack>
    </Stack> : null
    }
       
    </>
}

export default ProfileLogo