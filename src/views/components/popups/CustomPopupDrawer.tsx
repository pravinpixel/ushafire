import { Drawer, DrawerProps, drawerClasses } from '@mui/material';

import { pxToRem } from 'helper/GlobalHelper';
import { useResponsive } from 'helper/CustomHooks';

import useLayoutOpenClose from 'zustand-config/LayoutOpenClose';

import { NAV, HEADER, SPACING } from 'views/layouts/utils/config-layout';

type Props = DrawerProps;

const CustomPopupDrawer = (props: Props) => {
  const { open: navOpen } = useLayoutOpenClose();
  const breakpoint = useResponsive('down', 'lg');
  return (
    <Drawer
      id="form-drawer"
      variant="temporary"
      anchor="right"
      hideBackdrop
      sx={{
        [`& .${drawerClasses.paper}`]: {
          // width: `calc(100% - ${pxToRem(NAV.WIDTH)})`,
          width: ({ spacing }) => (navOpen ? `calc(100% - ${pxToRem(NAV.WIDTH + 32)})` : `calc(100% - ${!breakpoint ? spacing(10) : '25px'})`),
          mt: pxToRem(HEADER.H_DESKTOP + SPACING),
        },
      }}
      {...props}
    >
      {props.children}
    </Drawer>
  );
};

export default CustomPopupDrawer;
