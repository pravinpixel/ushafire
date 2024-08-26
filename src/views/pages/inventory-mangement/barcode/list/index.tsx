import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useBarcodeListApi } from 'store/hooks/InventoryManagementHook';

import { BarcodeTable } from '../_utils/BarcodeTable';

const BarcodeList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const url = '/barcode';
  const { data, isLoading } = useBarcodeListApi({
    params,
  });

  return (
    <BarcodeTable
      data={data?.data || []}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      buttonLabel="Barcode"
      url={url}
      permission={permission}
    />
  );
};
export default BarcodeList;
