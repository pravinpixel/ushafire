import { alpha, Stack, Drawer, Typography, drawerClasses, ClickAwayListener } from '@mui/material';

import { pxToRem } from 'helper/GlobalHelper';
import { useResponsive } from 'helper/CustomHooks';

import useLayoutOpenClose from 'zustand-config/LayoutOpenClose';

import { HEADER } from '../config-layout';
import NotificationCard from './NotificationCard';
// ----------------------------------------------
/**
 * This file is part of AutoPack.
 *
 * It is Notication Section
 *
 */
function NotificationDrawer() {
  const { notifyOpen, setNotifyOpen } = useLayoutOpenClose();
  const breakpoint = useResponsive('down', 'md');
  return (
    <ClickAwayListener onClickAway={() => setNotifyOpen(false)}>
      <Drawer
        variant="persistent"
        anchor="right"
        hideBackdrop
        open={notifyOpen}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            width: ({ spacing }) => `calc(${!breakpoint ? '25%' : '100%'} - ${spacing(10)})`,
            mt: pxToRem(HEADER.H_DESKTOP),
            flexShrink: 0,
            backgroundColor: ({ palette }) => alpha(palette.grey[100] || '', 0.8),
            p: ({ spacing }) => spacing(1),
          },
        }}
      >
        <Typography px={({ spacing }) => spacing(1)} variant="h6">
          Notifications
        </Typography>
        <Stack gap={1.5}>
          {Array.from({ length: 5 }).map(() => (
            <NotificationCard />
          ))}
        </Stack>
      </Drawer>
    </ClickAwayListener>
  );
}

export default NotificationDrawer;
