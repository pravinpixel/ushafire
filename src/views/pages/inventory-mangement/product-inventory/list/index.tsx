import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { useProductListApi } from 'store/hooks/InventoryManagementHook';

import { ProductTable } from '../_utils/ProductTable';

const ProductList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>({ ...InitialPagniationParams, status: 'Active' });
  const { data, isLoading } = useProductListApi({
    params,
  });

  return (
    <ProductTable
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

export default ProductList;
