import { Stack, Typography, IconButton } from '@mui/material';

import { ErrorIcon } from 'theme/svg';

type Props = {
  message: string;
  handleClose: () => void;
};

const ConfirmErrorMessage = ({ message, handleClose }: Props) => {
  return (
    <>
      <Typography variant="h6" fontWeight={500}>
        {message}
      </Typography>
      <Typography variant="h4" color={({ palette }) => palette.error.main}>
        Unsuccessful
      </Typography>
      <Stack direction={'row'} justifyContent={'center'}>
        <IconButton onClick={handleClose} sx={{ p: 0 }}>
          <ErrorIcon
            sx={{
              fontSize: '7.125rem',
              color: ({ palette }) => palette.error.main,
            }}
          />
        </IconButton>
      </Stack>
    </>
  );
};

export default ConfirmErrorMessage;
