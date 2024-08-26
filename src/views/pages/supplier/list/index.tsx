import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useSupplierListApi } from 'store/hooks/SupplierHooks';

import { SupplierTable } from '../_utils/SupplierList';

const SupplierList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const url = '/supplier';
  const { data, isLoading } = useSupplierListApi({
    params,
  });

  return (
    <SupplierTable
      data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      buttonLabel="Supplier"
      url={url}
      permission={permission}
    />
  );
};
export default SupplierList;
