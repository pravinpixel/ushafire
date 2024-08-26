/**
 * This file is part of AutoPack.
 *
 * Its Header file of auth layout
 *
 */
import { Menu } from '@mui/icons-material';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Stack, Avatar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { HelpIcon, NotificationIcon } from 'theme/svg';

import { avaterImage } from 'helper/AssetHelper';
import { useResponsive } from 'helper/CustomHooks';
import { capitalizeFirstLetter } from 'helper/GlobalHelper';

import useMyProfieStore from 'zustand-config/MyProfileZustand';
import useLayoutOpenClose from 'zustand-config/LayoutOpenClose';

import { NAV, HEADER } from './config-layout';
import { Searchbar, MobileSearchbar } from './search-bar';

// ----------------------------------------------------------------------
type HeaderProps = {
  onOpenNav: boolean;
  handleDrawerOpen: () => void;
};
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => {
  return {
    boxShadow: 'none',
    height: HEADER.H_DESKTOP,
    background: theme.palette.common.white,
    color: theme.palette.grey[600],
    borderBottom: ` 1px solid ${theme.palette.divider}`,
    // borderBottom: them,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${65}px)`,
    ...(open && {
      marginLeft: NAV.WIDTH,
      width: `calc(100% - ${NAV.WIDTH}px)`,
    }),
    [theme.breakpoints.down('lg')]: {
      width: `100%`,
    },
  };
});

export default function Header({ onOpenNav, handleDrawerOpen }: HeaderProps) {
  const user = useMyProfieStore((state) => state.user);
  const mobile = useResponsive('down', 'lg');
  const { setNotifyOpen, notifyOpen } = useLayoutOpenClose();
  return (
    <AppBar position="fixed" open={onOpenNav}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
          <Menu />
        </IconButton>
        {!mobile && <Searchbar />}
        <Stack direction="row" alignItems="center" gap={1} spacing={1} height={20}>
          {mobile && <MobileSearchbar />}
          <IconButton>
            <HelpIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setNotifyOpen(!notifyOpen);
            }}
          >
            <NotificationIcon inheritViewBox={true} />
          </IconButton>
          <Avatar sx={{ width: '2rem', height: '2rem' }} alt="Travis Howard" src={avaterImage} />
          <Stack justifyItems="center" textAlign={'center'}>
            <Typography variant="subtitle2" lineHeight={1} color={(theme) => theme.palette.common.black}>
              {capitalizeFirstLetter(user?.name || '')}
            </Typography>
            <Typography variant="subtitle3">{capitalizeFirstLetter(user?.role_id?.name)}</Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
