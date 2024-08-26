import { Stack, Typography, IconButton } from '@mui/material';

import { SucessIcon } from 'theme/svg';

type Props = {
  message: string;
  handleClose: () => void;
};

const ConfirmSucessMessage = ({ message, handleClose }: Props) => {
  return (
    <>
      <Typography variant="h6" fontWeight={500}>
        {message}
      </Typography>
      <Typography variant="h4" color={({ palette }) => palette.success.main}>
        Successfully
      </Typography>
      <Stack direction={'row'} justifyContent={'center'}>
        <IconButton onClick={handleClose} sx={{ p: 0 }}>
          <SucessIcon
            sx={{
              fontSize: '7.125rem',
              color: ({ palette }) => palette.success.main,
            }}
          />
        </IconButton>
      </Stack>
    </>
  );
};

export default ConfirmSucessMessage;
