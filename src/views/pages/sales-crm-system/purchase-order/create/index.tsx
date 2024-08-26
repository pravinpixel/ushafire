import { ComponentProps } from 'helper/types/GlobalTypes';
import { PurchaseOrderTypeForm } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import PurchaseOrderForm from '../_utils/PurchaseOrderForm';

const PurchaseOrderCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: PurchaseOrderTypeForm = {
    type: 'PO',
    purchaseOrderItems: [
      {
        productId: null,
        SKU: '',
        quantity: 0,
      },
    ],
  };
  return (
    <PurchaseOrderForm
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default PurchaseOrderCreate;
