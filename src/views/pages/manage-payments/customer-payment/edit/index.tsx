import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useCustomerPaymentView } from 'store/hooks/ManagePaymentHooks';

import PageLoader from 'views/components/loader/PageLoader';

import CustomerPaymentForm from '../_utils/CustomerPaymentForm';

const CustomerPaymentEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useCustomerPaymentView(id);

  return isFetching ? (
    <PageLoader />
  ) : (
    <CustomerPaymentForm
      permission={parentPermission}
      navigateLink={parentPermission?.path ?? '/'}
      title={'Manage ' + parentPermission?.name}
      defaultValue={{
        ...data,
      }}
    />
  );
};

export default CustomerPaymentEdit;
