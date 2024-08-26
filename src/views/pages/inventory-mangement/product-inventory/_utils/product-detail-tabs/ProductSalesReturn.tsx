// type Props = {};

import { useState } from 'react';

import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

// import { useProductListApi } from 'store/hooks/InventoryManagementHook';

import { ProductViewTable } from '../ProductViewTable';

const ProductSalesReturn = () => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  // const { data, isLoading } = useProductListApi({
  //   params,
  // });

  //   const tabledata = {
  //     list: [
  //       {
  //       _id: 1,
  //       loan: 'AP-7345092168',
  //       loandate: 'February 29, 2024',
  //       customername: 'Wei Ling Tan',
  //       employeename: 'Wei Ling Tan',
  //       return: 'February 29, 2024',
  //       purpose: 'Demo',
  //     },
  //     {
  //       _id: 2,
  //       loan: 'AP-7345092168',
  //       loandate: 'February 29, 2024',
  //       customername: 'Wei Ling Tan',
  //       employeename: 'Wei Ling Tan',
  //       return: 'February 29, 2024',
  //       purpose: 'Demo',
  //     },
  //     {
  //       _id: 3,
  //       loan: 'AP-7345092168',
  //       loandate: 'February 29, 2024',
  //       customername: 'Wei Ling Tan',
  //       employeename: 'Wei Ling Tan',
  //       return: 'February 29, 2024',
  //       purpose: 'Demo',
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
        loan: true,
        loandate: true,
        customername: true,
        employeename: true,
        return: true,
        purpose: true,
        quantity: false,
      }}
    />
  );
};
export default ProductSalesReturn;
