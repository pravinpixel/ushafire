import { IconButton, CircularProgress } from '@mui/material';

import { PrinterIcon } from 'theme/svg';

import { usePrintApi } from 'store/hooks/EssentialHooks';

const PrintIcon = ({ type, id }: { type?: string; id?: string }) => {
  const { mutateAsync, isPending } = usePrintApi();
  const params = {
    type,
    id,
  };

  const handleClickOpen = async () => {
    await mutateAsync(params, {});
  };

  return (
    <>
      {isPending ? (
        <IconButton>
          <CircularProgress size={23} />
        </IconButton>
      ) : (
        <IconButton onClick={handleClickOpen}>
          <PrinterIcon />
        </IconButton>
      )}
    </>
  );
};

export default PrintIcon;
