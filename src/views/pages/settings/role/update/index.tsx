import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useRoleView } from 'store/hooks/SettingHooks';

import PageLoader from 'views/components/loader/PageLoader';

import RoleForm from '../_utils/RoleForm';

export default function RoleEdit({ parentPermission }: ComponentProps) {
  const { id } = useParams();
  const { data: defaultValues, isFetching } = useRoleView(id);

  return isFetching ? (
    <PageLoader />
  ) : (
    <RoleForm defaultValues={defaultValues} navigateTo={parentPermission?.path ?? '/'} title={'Edit ' + parentPermission?.name} />
  );
}
