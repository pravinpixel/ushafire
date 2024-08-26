/**
 * This file is part of AutoPack.
 *
 * It is layout of the auth layout
 *
 */

import Box from '@mui/material/Box';

import useLayoutOpenClose from 'zustand-config/LayoutOpenClose';

import Nav from './utils/Nav';
import Main from './utils/Main';
import Header from './utils/Header';

// ----------------------------------------------------------------------

export default function WebLayout({ children }: { children?: React.ReactNode }) {
  const { open, setOpen } = useLayoutOpenClose();
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box display={'flex'}>
      <Nav openNav={open} handleDrawerClose={handleDrawerClose} />
      <Header onOpenNav={open} handleDrawerOpen={handleDrawerOpen} />
      <Main>{children}</Main>
    </Box>
  );
}
