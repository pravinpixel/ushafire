import { ComponentProps } from 'helper/types/GlobalTypes';
import { SaleOrderTypeForm } from 'helper/types/sales-crm-system/SalesOrderTypes';

import SaleOrderForm from '../_utils/SalesOrderForm';

const SaleOrderCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: SaleOrderTypeForm = {};
  return (
    <SaleOrderForm
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default SaleOrderCreate;
