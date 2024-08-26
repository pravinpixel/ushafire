import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useStockOutwardListApi } from 'store/hooks/InventoryManagementHook';

import { StockOutwardTable } from '../_utils/StockOutwardTable';

const StockOutwardList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useStockOutwardListApi({
    params,
  });

  return (
    <StockOutwardTable
      data={data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
    />
  );
};
export default StockOutwardList;
