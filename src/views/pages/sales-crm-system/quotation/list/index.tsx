import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { QuotationListKey, useQuotationListApi } from 'store/hooks/SalesCrmSystemHook';

import QuotationListTable from '../_utils/QuotationListTable';

const ListQuotation: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useQuotationListApi({
    params,
  });

  return (
    <QuotationListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={QuotationListKey}
    />
  );
};

export default ListQuotation;
