import { ComponentProps } from 'helper/types/GlobalTypes';
import { SalesReturnFormType } from 'helper/types/sales-crm-system/SalesReturnTypes';

import SalesReturnForm from '../_utils/SalesReturnForm';

const CreateSalesReturn: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: SalesReturnFormType = {};
  return <SalesReturnForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />;
};

export default CreateSalesReturn;
