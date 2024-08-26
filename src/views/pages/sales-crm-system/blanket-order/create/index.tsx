import { ComponentProps } from 'helper/types/GlobalTypes';
import { BlanketOrderFormType } from 'helper/types/sales-crm-system/BlanketOrderTypes';

import OpportunityForm from '../_utils/BlanketForm';

const CreateOpportunity: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: BlanketOrderFormType = {
  };
  return <OpportunityForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />;
};

export default CreateOpportunity;
