import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useWarehouseWiseListApi } from 'store/hooks/InventoryManagementHook';

import { WarehouseTable } from '../_utils/WarehouseTable';

const WareHouseWiseList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useWarehouseWiseListApi({
    params,
  });

  return (
    <WarehouseTable
      data={data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
    />
  );
};
export default WareHouseWiseList;
