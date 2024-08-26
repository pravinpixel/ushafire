import { ComponentProps } from 'helper/types/GlobalTypes';
import { DealsFormType } from 'helper/types/sales-crm-system/DealsTypes';

import DealsForm from '../_utils/DealsForm';

const CreateDeals: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: DealsFormType = {};
  return <DealsForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />;
};

export default CreateDeals;
