import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { usePurchaseOrderListApi } from 'store/hooks/SalesCrmSystemHook';

import PurchaseOrderTable from '../_utils/PurchaseOrderTable';

const PurchaseOrderList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>({
    ...InitialPagniationParams,
    type: 'PO',
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

export default PurchaseOrderList;
