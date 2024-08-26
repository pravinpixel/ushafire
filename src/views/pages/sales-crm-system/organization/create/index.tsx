import { ComponentProps } from 'helper/types/GlobalTypes';
import { OrganizationFormType } from 'helper/types/sales-crm-system/OrganizationTypes';

import OrganizationForm from '../_utils/OrganizationForm';

const CreateOrganization: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: OrganizationFormType = {
    address: '',
    businessType: null,
    contact: '',
    email: '',
    fax: '',
    website: '',
    organizationName: '',
    paymentTermsId: null,
    verticalTypeId: null,
  };
  return (
    <OrganizationForm title={'Create New ' + parentPermission?.name} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />
  );
};

export default CreateOrganization;
