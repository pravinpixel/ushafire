import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useRoleListApi } from 'store/hooks/SettingHooks';

import { RoleTable } from '../_utils/RoleList';

const RoleList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useRoleListApi({
    params,
  });

  return (
    <RoleTable
      data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      url={'/role'}
      permission={permission}
    />
  );
};
export default RoleList;
