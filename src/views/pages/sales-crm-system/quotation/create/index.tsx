import { ComponentProps } from 'helper/types/GlobalTypes';
import { QuotationFormType } from 'helper/types/sales-crm-system/QuotationTypes';

import QuotationForm from '../_utils/QuotationForm';

const CreateQuotation: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: QuotationFormType = {};
  return <QuotationForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />;
};

export default CreateQuotation;
