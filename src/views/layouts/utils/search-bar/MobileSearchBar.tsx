/**
 * This file is part of AutoPack.
 *
 * Search File of Mobile componet
 *
 */
import { useState } from 'react';

import { Search } from '@mui/icons-material';
import { Slide, styled, IconButton, ClickAwayListener } from '@mui/material';

import { bgBlur } from 'theme/css';

import SearchButtons from './SearchButtons';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function MobileSearchbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen} sx={{ padding: 0 }}>
            <Search />
          </IconButton>
        )}
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <SearchButtons />
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
