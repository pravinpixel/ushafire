import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { OpportunityListKey, useOpportunityListApi } from 'store/hooks/SalesCrmSystemHook';

import OpportunityListTable from '../_utils/OpportunityListTable';

const ListOpportunity: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useOpportunityListApi({
    params,
  });

  return (
    <OpportunityListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={OpportunityListKey}
    />
  );
};

export default ListOpportunity;
