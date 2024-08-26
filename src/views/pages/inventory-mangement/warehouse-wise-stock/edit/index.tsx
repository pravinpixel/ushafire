import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { WareHouseWiseFormType } from 'helper/types/inventory-management/WareHouseWise';

import { useWareHouseWiseView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import WareHouseWiseForm from '../_utils/WareHouseWiseForm';

const WareHouseWiseEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useWareHouseWiseView(id);
  const DefaultValue: WareHouseWiseFormType = {
    ...data,
    warehouseName: data?.warehouseId?.name,
    warehouseCode: data?.warehouseId?.code,
    warehouseAddress: data?.warehouseId?.address,
  };
  return isFetching ? (
    <PageLoader />
  ) : (
    <WareHouseWiseForm
      permission={parentPermission}
      title={'Edit ' + parentPermission?.name}
      defaultValue={DefaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default WareHouseWiseEdit;
