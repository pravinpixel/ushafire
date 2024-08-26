import { ComponentProps } from 'helper/types/GlobalTypes';
import { ContactsTypeForm } from 'helper/types/sales-crm-system/ContactsTypes';

import ContactsForm from '../_utils/ContactsForm';

const ContactCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: ContactsTypeForm = {
    contactType: null,
    password: '',
    createdOn: '',
  };

  return (
    <ContactsForm
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default ContactCreate;
