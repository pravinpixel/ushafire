/**
 * This file is part of AutoPack.
 *
 * It is Main children pass in this  auth children
 *
 */

import React from 'react';

import Box from '@mui/material/Box';

import { pxToRem } from 'helper/GlobalHelper';

import { NAV, HEADER, SPACING } from './config-layout';
import { NotificationDrawer } from './notification-bar';

// ----------------------------------------------------------------------

type Mainprops = {
  children: React.ReactNode | undefined;
  sx?: object | undefined;
  other?: unknown | undefined;
};

export default function Main({ children, sx, ...other }: Mainprops) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        // py: `${HEADER.H_MOBILE + SPACING}px`,
        // ...(lgUp && {
        px: NAV.PX,
        pt: pxToRem(HEADER.H_DESKTOP + SPACING),
        width: `calc(100% - ${pxToRem(NAV.WIDTH)})`,
        mb: NAV.MB,
        // }),
        ...sx,
      }}
      {...other}
    >
      {children}
      <NotificationDrawer />
    </Box>
  );
}
