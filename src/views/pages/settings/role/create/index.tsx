import { useRouter } from 'helper/CustomHooks';
import { ModuleType } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { RoleFormType } from 'helper/types/AdminSettingTypes';

import { useRoleView } from 'store/hooks/SettingHooks';
import { useEssentialList, useGenerateIdApi } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';

import RoleForm from '../_utils/RoleForm';

type UserRoleStatic = {
  access_manage: ModuleType[];
};

export default function RoleAdd({ parentPermission }: ComponentProps) {
  const { getParams } = useRouter();
  const RoleId = getParams('role-id');
  const { data: generateID, isFetching } = useGenerateIdApi({
    params: {
      vision: 'UserRole',
    },
  });
  const { data, isFetching: essentialLoading } = useEssentialList({
    params: {
      include: ['UserRoleStatic'],
    },
  });
  const { data: roleData, isFetching: roleLoading } = useRoleView(RoleId ?? '', !!RoleId);

  const defaultValues: RoleFormType = {
    code: generateID?.code || '1',
    name: '',
    status: true,
    access_manage: RoleId ? roleData?.access_manage : (data?.UserRoleStatic as unknown as UserRoleStatic)?.access_manage || [],
  };

  const loading = essentialLoading || isFetching || roleLoading;

  return loading ? (
    <PageLoader />
  ) : (
    <RoleForm navigateTo={parentPermission?.path ?? '/'} defaultValues={defaultValues} title={'Create ' + parentPermission?.name} />
  );
}
