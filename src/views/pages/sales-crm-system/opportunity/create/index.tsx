import { ComponentProps } from 'helper/types/GlobalTypes';
import { OpportunityFormType } from 'helper/types/sales-crm-system/OpportunityTypes';

import OpportunityForm from '../_utils/OpportunityForm';

const CreateOpportunity: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: OpportunityFormType = {
    opportunityNumber: '',
    opportunityDate: '',
    customerId: null,
    leadId: null,
    leadDate: '',
    salePersonId: null,
    opportunityType: null,
    status: 'Save as Draft',
    opportunityItems: [],
    leadType: null,
  };
  return <OpportunityForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />;
};

export default CreateOpportunity;
