import { useForm } from 'react-hook-form';

import { Box, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

import { useResponsive } from 'helper/CustomHooks';
import { RoleFormType } from 'helper/types/AdminSettingTypes';

import { useRoleView } from 'store/hooks/SettingHooks';

import PageLoader from 'views/components/loader/PageLoader';

import Permission from './Permission';
import { RoleContext } from './RoleForm';

function PermissionForm({ data }: { data?: RoleFormType }) {
  const { control, setValue, watch } = useForm<RoleFormType>({
    defaultValues: data,
  });
  return (
    <RoleContext.Provider value={{ setValue, watch }}>
      <Permission view={true} control={control} md={12} permissions={data?.access_manage ?? []} />
    </RoleContext.Provider>
  );
}

const RoleModal = ({ id, setOpen }: { id?: string; setOpen: (value: React.SetStateAction<boolean>) => void }) => {
  const { data, isFetching } = useRoleView(id);
  const sm = useResponsive('down', 'md');
  return isFetching ? (
    <PageLoader />
  ) : (
    <Box width={!sm ? '50vw' : '100vw'} position={'relative'} justifyContent={'flex-end'}>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        color="inherit"
        sx={{
          mx: 2,
          mt: 1,
        }}
      >
        <CloseOutlined />
      </IconButton>
      <PermissionForm data={data} />
    </Box>
  );
};

export default RoleModal;
