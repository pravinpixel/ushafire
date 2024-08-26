import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { useUserListApi } from 'store/hooks/SettingHooks';

import { UserTable } from '../_utils/UserList';

const UserList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>({
    page: 0,
    pageSize: 20,
    search: '',
    department: [],
    designation: [],
  });
  const url = '/users';
  const { data, isLoading } = useUserListApi({
    params,
  });

  return (
    <UserTable
      data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      url={url}
    />
  );
};
export default UserList;
