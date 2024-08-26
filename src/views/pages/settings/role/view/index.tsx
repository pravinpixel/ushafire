import { useState } from 'react';

import { Drawer, IconButton } from '@mui/material';

import { ViewIcon } from 'theme/svg';

import RoleModal from '../_utils/RoleModal';

const RoleView = ({ id }: { id?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(!open)}>
        <ViewIcon />
      </IconButton>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <RoleModal id={id} setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default RoleView;
