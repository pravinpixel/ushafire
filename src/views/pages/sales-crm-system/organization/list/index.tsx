import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { OrganizationListKey, useOrganizationListApi } from 'store/hooks/SalesCrmSystemHook';

import OrganizationListTable from '../_utils/OrganizationListTable';

const ListOrganization: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useOrganizationListApi({
    params,
  });

  return (
    <OrganizationListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={OrganizationListKey}
    />
  );
};

export default ListOrganization;
