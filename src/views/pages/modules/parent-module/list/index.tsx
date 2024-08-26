import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useParentModuleListApi } from 'store/hooks/ModuleHooks';

import { ModuleTable } from '../../_utils/ModuleList';

export default function ParentPermissionList({ permission }: ComponentProps) {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useParentModuleListApi({
    params,
  });

  return (
    <ModuleTable
      data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      buttonLabel="Parent Module"
      url={'/parent-module'}
      permission={permission}
      visbleColumn={{
        label: false,
      }}
    />
  );
}
