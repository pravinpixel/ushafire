import { ComponentProps } from 'helper/types/GlobalTypes';
import { PurchaseOrderTypeForm } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import PurchaseOrderForm from '../../purchase-order/_utils/PurchaseOrderForm';

const CreatePoRequest: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: PurchaseOrderTypeForm = {
    type: 'PO Request',
    
  };

  return (
    <PurchaseOrderForm
      title={'Create New ' + parentPermission?.name}
      navigateLink={parentPermission?.path ?? '/'}
      defaultValue={DefaultValue}
      formTitle={'Po Request Details'}
    />
  );
};

export default CreatePoRequest;
