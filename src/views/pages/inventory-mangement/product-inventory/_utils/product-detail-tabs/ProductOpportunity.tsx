// type Props = {};

import { useState } from 'react';

import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

// import { useProductListApi } from 'store/hooks/InventoryManagementHook';

import { ProductViewTable } from '../ProductViewTable';

const ProductOpportunity = () => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  // const url = '/';
  // const { data, isLoading } = useProductListApi({
  //   params,
  // });

  //   const tabledata = {
  //     list: [
  //       {
  //       _id: 1,
  //       stock: 'AP-7345092168',
  //       inwarddate: 'February 29, 2024',
  //       supplier: 'Barcode Solutions PTE Ltd',
  //       quantity: 541,
  //       total: 'S$12,369',
  //     },
  //     {
  //       _id: 2,
  //       stock: 'AP-6258410379',
  //       inwarddate: 'February 22, 2024',
  //       supplier: 'Barcode Solutions PTE Ltd',
  //       quantity: 421,
  //       total: 'S$14,696',
  //     },
  //     {
  //       _id: 3,
  //       stock: 'AP-8792035461',
  //       inwarddate: 'February 21, 2024',
  //       supplier: 'Barcode Solutions PTE Ltd',
  //       quantity: 123,
  //       total: 'S$25,694',
  //     },
  //     {
  //       _id: 4,
  //       stock: 'AP-4021857369',
  //       inwarddate: 'February 18, 2024',
  //       supplier: 'Barcode Solutions PTE Ltd',
  //       quantity: 654,
  //       total: 'S$20,694',
  //     },
  //     {
  //       _id: 5,
  //       stock: 'AP-1674309852',
  //       inwarddate: 'February 17, 2024',
  //       supplier: 'Barcode Solutions PTE Ltd',
  //       quantity: 234,
  //       total: 'S$14,674',
  //     },
  //     {
  //       _id: 6,
  //       stock: 'AP-5839204671',
  //       inwarddate: 'February 16, 2024',
  //       supplier: 'Barcode Solutions PTE Ltd',
  //       quantity: 115,
  //       total: 'S$10,852',
  //     },
  //     {
  //       _id: 7,
  //       stock: 'AP-7246150938',
  //       inwarddate: 'February 15, 2024',
  //       supplier: 'Barcode Solutions PTE Ltd',
  //       quantity: 466,
  //       total: 'S$9,475',
  //     },
  //   ]
  // };

  return (
    <ProductViewTable
      data={[]}
      // data={data?.data || []}
      params={params}
      setParams={setParams}
      // isLoading={isLoading}
      visbleColumn={{
        stock: true,
        inwarddate: true,
        supplier: true,
        total: true,
      }}
    />
  );
};
export default ProductOpportunity;
