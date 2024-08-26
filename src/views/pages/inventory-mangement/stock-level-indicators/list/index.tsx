import {  useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useStockLevelListApi } from 'store/hooks/InventoryManagementHook';

import StockLevelTable from '../_utils/StockLevelTable';

const StockLevelIndicatorList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useStockLevelListApi({
    params,
  });

  return (
    <StockLevelTable
      data={data}
      isLoading={isLoading}
      params={params}
      setParams={setParams}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl="ProductList"
      fieldLabel=""
    />
  );
};

export default StockLevelIndicatorList;
