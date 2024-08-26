import { ComponentProps } from 'helper/types/GlobalTypes';
import { WareHouseWiseFormType } from 'helper/types/inventory-management/WareHouseWise';

import WareHouseWiseForm from '../_utils/WareHouseWiseForm';

const WareHouseWiseCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: WareHouseWiseFormType = {
    warehouseId: null,
    warehouseWSItems: [
      {
        productId: null,
        categoryId: null,
        subCategoryId: null,
        sku: '',
        bayId: null,
        rackId: null,
        shelvesId: null,
        binId: null,
        quantity: 0,
      },
    ],
  };
  return (
    <WareHouseWiseForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      defaultValue={defaultValue}
    />
  );
};

export default WareHouseWiseCreate;
