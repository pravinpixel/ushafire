import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { SalesInvoiceListKey, useSalesInvoiceListApi } from 'store/hooks/SalesCrmSystemHook';

import SalesInvoiceListTable from '../_utils/SalesInvoiceListTable';

const ListSalesInvoice: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useSalesInvoiceListApi({
    params,
  });
  return (
    <SalesInvoiceListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={SalesInvoiceListKey}
    />
  );
};

export default ListSalesInvoice;
