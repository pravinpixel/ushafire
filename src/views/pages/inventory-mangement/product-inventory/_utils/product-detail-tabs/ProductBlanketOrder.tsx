import { useState } from 'react';

import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

// import { useProductListApi } from 'store/hooks/InventoryManagementHook';

import { ProductViewTable } from '../ProductViewTable';

const ProductBlanketOrder = () => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  // const url = '/';
  // const { data, isLoading } = useProductListApi({
  //   params,
  // });

  //   const tabledata = {
  //     list: [
  //       {
  //       _id: 1,
  //       customers: 'customers A',
  //       products: 'CapitaLand ',
  //       sku: 'SKU AP646431 ',
  //       quantity: 541,
  //     },
  //     {
  //       _id: 2,
  //       customers: 'customers B',
  //       products: 'Singtel  ',
  //       sku: 'SKU AP646431 ',
  //       quantity: 541,
  //     },
  //     {
  //       _id: 3,
  //       customers: 'customers C',
  //       products: 'DBS Bank ',
  //       sku: 'SKU AP646431 ',
  //       quantity: 541,
  //     },
  //   ]
  // };

  return (
    <ProductViewTable
      data={[]}
      // data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={false}
      visbleColumn={{
        customers: true,
        products: true,
        sku: true,
      }}
    />
  );
};
export default ProductBlanketOrder;
