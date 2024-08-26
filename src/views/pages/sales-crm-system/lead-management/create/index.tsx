import { ComponentProps } from 'helper/types/GlobalTypes';
import { LeadFormType } from 'helper/types/sales-crm-system/LeadManagementTypes';

import { useGenerateIdApi } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';

import LeadForm from '../_utils/LeadForm';

const CreateLead: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { data: generateCode, isFetching } = useGenerateIdApi({
    vision: 'LeadManagement',
  });
  const DefaultValue: LeadFormType = {
    leadNumber: generateCode?.code || '',
    leadDate: '',
    customerId: null,
    salePersonId: null,
    existingCustomer: { label: 'No', value: 'No' },
    referralSource: { label: 'No', value: 'No' },
    leadType: null,
    notes: '',
    leadQualification: 'Not Qualified',
    leadItems: [
      {
        brandId: null,
        categoryId: null,
        productId: null,
        quantity: 0,
        sku: '',
        subCategoryId: null,
      },
    ],
  };

  return isFetching ? (
    <PageLoader />
  ) : (
    <LeadForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />
  );
};

export default CreateLead;
