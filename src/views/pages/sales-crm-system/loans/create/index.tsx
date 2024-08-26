import { ComponentProps } from 'helper/types/GlobalTypes';
import { LoansTypeForm } from 'helper/types/sales-crm-system/LoansTypes';

import LoansForm from '../_utils/LoansForm';

const SaleOrderCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: LoansTypeForm = {};
  return (
    <LoansForm
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default SaleOrderCreate;
