/**
 * This file is part of AutoPack.
 *
 * Image Preview for Barecode image
 *
 */
import { useState } from 'react';

import { Stack, Dialog, Avatar, IconButton, Typography } from '@mui/material';

import { ViewIcon } from 'theme/svg';

import { defaultImage } from 'helper/AssetHelper';

const BarcodeView = ({ id, imagesrcs, barcodeNumber }: { id?: string; imagesrcs?: string | undefined; barcodeNumber?: string }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <ViewIcon />
      </IconButton>
      <Dialog open={open} id={id} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <Stack
          sx={{ paddingX: 5, paddingY: 3.5, minHeight: '13.5rem', minWidth: '21.875rem', maxWidth: '30rem' }}
          textAlign={'center'}
          direction={'column'}
          justifyContent={'center'}
          alignContent={'center'}
          gap={1}
        >
          <Avatar
            variant="square"
            src={(imagesrcs as string) ?? defaultImage}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
          <Typography>{barcodeNumber}</Typography>
        </Stack>
      </Dialog>
    </>
  );
};

export default BarcodeView;
