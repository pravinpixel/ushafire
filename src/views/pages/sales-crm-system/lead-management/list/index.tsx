import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { LeadListKey, useLeadListApi } from 'store/hooks/SalesCrmSystemHook';

import LeadListTable from '../_utils/LeadListTable';

const ListLead: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useLeadListApi({
    params,
  });

  return (
    <LeadListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={LeadListKey}
    />
  );
};

export default ListLead;
