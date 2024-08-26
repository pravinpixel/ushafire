import { useCallback } from 'react';

import { Stack, Dialog } from '@mui/material';

import ConfirmMessage from './_utils/ConfirmMessage';
import ConfirmErrorMessage from './_utils/ConfirmErrorMessage';
import ConfirmSucessMessage from './_utils/ConfirmSucessMessage';

// ----------------------------------------------------------------------------

const ConfirmationPopup = ({
  handleClose,
  open,
  label = '',
  handleSubmit,
  content,
  // loading = false,
  message = '',
}: {
  handleSubmit: () => Promise<void>;
  handleClose: () => void;
  open: boolean;
  label?: string;
  // loading: boolean;
  sucesslabel?: string;
  content: string | null;
  message?: string;
}) => {
  const handleContent = useCallback(() => {
    switch (content) {
      case 'sucess':
        return 'sucess';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  }, [content]);

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <Stack
        sx={{ padding: 5, minHeight: '13.5rem', minWidth: '21.875rem', maxWidth: '30rem' }}
        textAlign={'center'}
        direction={'column'}
        justifyContent={'center'}
      >
        {handleContent() === 'default' && <ConfirmMessage label={label} handleSubmit={handleSubmit} handleClose={handleClose} />}
        {handleContent() === 'sucess' && <ConfirmSucessMessage handleClose={handleClose} message={message} />}
        {handleContent() === 'error' && <ConfirmErrorMessage handleClose={handleClose} message={message} />}
      </Stack>
    </Dialog>
  );
};

export default ConfirmationPopup;
