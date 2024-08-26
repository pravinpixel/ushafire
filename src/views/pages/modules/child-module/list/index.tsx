import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useChildModuleListApi } from 'store/hooks/ModuleHooks';

import { ModuleTable } from '../../_utils/ModuleList';

export default function ChildPermissionList({ permission }: ComponentProps) {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useChildModuleListApi({
    params,
  });
  return (
    <ModuleTable
      data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      buttonLabel="Child Module"
      url={'/child-module'}
      permission={permission}
      visbleColumn={{
        label: false,
        parent_id: true,
      }}
    />
  );
}
