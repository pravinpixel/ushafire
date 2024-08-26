import { useParams } from 'react-router-dom';

import { decrypt } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { ContactsTypeForm } from 'helper/types/sales-crm-system/ContactsTypes';

import { useContactView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import ContactsForm from '../_utils/ContactsForm';

const ContactEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useContactView(id);
  const DefaultValue: ContactsTypeForm = {
    ...data,
    password: decrypt(data?.password),
  };
  return isFetching ? (
    <PageLoader />
  ) : (
    <ContactsForm
      permission={parentPermission}
      title={'Edit ' + parentPermission?.name}
      defaultValue={DefaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default ContactEdit;
