import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useStockInwardListApi } from 'store/hooks/InventoryManagementHook';

import { StockInwardTable } from '../_utils/StockInwardTable';

const StockInwardList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useStockInwardListApi({
    params,
  });

  return (
    <StockInwardTable
      data={data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
    />
  );
};
export default StockInwardList;
