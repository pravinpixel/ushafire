import { Box, Card, Typography } from '@mui/material';

import DummyField from 'views/components/form-components/DummyField';

function NotificationCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '6.3rem',
        p: ({ spacing }) => spacing(1),
      }}
    >
      <Typography>Stocklevel Indicator</Typography>
      <Box height={'55%'} mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-around'} bgcolor={({ palette }) => palette.grey[100]}>
        <Typography>Reaching Limit</Typography>
        <DummyField
          value={5}
          width={'20%'}
          inputProps={{
            sx: {
              bgcolor: ({ palette }) => palette.customColor.darkRed,
              color: ({ palette }) => palette.common.white,
            },
          }}
        />
      </Box>
    </Card>
  );
}

export default NotificationCard;
