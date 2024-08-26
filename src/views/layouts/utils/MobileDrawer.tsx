/**
 * This file is part of AutoPack.
 *
 * It is Nav drawer for Mobile responsive
 *
 */
import { ReactNode } from 'react';

import { Drawer } from '@mui/material';

import { NAV } from './config-layout';

const MobileDrawer = ({ openNav, onCloseNav, renderContent }: { openNav: boolean; onCloseNav: () => void; renderContent: ReactNode }) => {
  return (
    <Drawer
      open={openNav}
      onClose={onCloseNav}
      PaperProps={{
        sx: {
          width: NAV.WIDTH,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
};

export default MobileDrawer;
