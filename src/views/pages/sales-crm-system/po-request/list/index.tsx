import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { usePurchaseOrderListApi } from 'store/hooks/SalesCrmSystemHook';

import PurchaseOrderTable from '../../purchase-order/_utils/PurchaseOrderTable';

const ListPoRequest: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>({
    ...InitialPagniationParams,
    type: 'PO Request',
  });
  const { data, isLoading } = usePurchaseOrderListApi({
    params,
  });

  return (
    <PurchaseOrderTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
    />
  );
};

export default ListPoRequest;
