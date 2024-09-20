import { Box, Stack, Typography } from '@mui/material'
import userStore from '../../../zustand/UserZustand'
import CircularProgressBar from './ProgressBar'

const ProfileTaskContent = () => {
    const user = userStore().user
    return <Stack display={'flex'} flexDirection={'row'} alignItems='center' justifyContent='center' gap={2}>
        <Box display='flex' justifyContent='center' alignItems='center'><CircularProgressBar progressValue={user?.task_percentage || 0} /></Box>
        <Stack>
            <Typography variant={'f18'} fontWeight={700} color={'white'}>You have {user?.pending_task || 0} task to complete</Typography>
            <Typography variant={'f14'}>You’ve made it halfway! Keep going strong</Typography>
        </Stack>
    </Stack>
}

export default ProfileTaskContent