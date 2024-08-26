/**
 * This file is part of AutoPack.
 *
 * Image Preview for all  image fields
 * it used various purpose in drag and drop image  , etc..
 *
 */
import { useState } from 'react';

import { Stack, Dialog, Avatar, AvatarProps } from '@mui/material';

import { defaultImage } from 'helper/AssetHelper';
type Props = AvatarProps;
const ImagePreview = ({ ...props }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };
  return (
    <>
      <Avatar
        onClick={handleClickOpen}
        variant="square"
        slotProps={{
          img: {
            sx: {
              objectFit: 'contain',
            },
          },
        }}
        {...props}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <Stack
          sx={{ padding: 5, minHeight: '13.5rem', minWidth: '21.875rem', maxWidth: '30rem' }}
          textAlign={'center'}
          direction={'column'}
          justifyContent={'center'}
          alignContent={'center'}
        >
          <Avatar
            variant="square"
            src={(props.src as string) ?? defaultImage}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Stack>
      </Dialog>
    </>
  );
};

export default ImagePreview;
