import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Button, Typography } from '@mui/material';

type Props = {
  label: string;
  // loading: boolean;
  handleSubmit: () => Promise<void>;
  handleClose: () => void;
};

const ConfirmMessage = ({ label, handleClose, handleSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleLoading = async () => {
    try {
      setLoading(true);
      await handleSubmit();
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  return (
    <>
      <Typography variant="h6" fontWeight={500}>
        Are you sure do you want to
      </Typography>
      <Typography variant="h4" color={({ palette }) => palette.error.main}>
        {label} ?
      </Typography>
      <Stack direction={'row'} mt={3} justifyContent={'space-around'}>
        <LoadingButton loading={loading} onClick={handleLoading} variant="contained">
          Yes
        </LoadingButton>
        <Button onClick={handleClose} variant="contained" color="info">
          No
        </Button>
      </Stack>
    </>
  );
};

export default ConfirmMessage;
