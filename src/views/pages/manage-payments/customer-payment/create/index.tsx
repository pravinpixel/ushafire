import { useRouter } from 'helper/CustomHooks';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { CustomerPaymentType } from 'helper/types/manage-payments/CustomerPayments';

import { useCustomerPaymentInoviceView } from 'store/hooks/ManagePaymentHooks';

import PageLoader from 'views/components/loader/PageLoader';

import CustomerPaymentForm from '../_utils/CustomerPaymentForm';

const CustomerPaymentCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const router = useRouter();
  const InVoiceId = {
    _id: router?.getParams('invoice_id') ?? undefined,
  };
  const { data, isFetching } = useCustomerPaymentInoviceView(InVoiceId._id);

  const defaultValue: CustomerPaymentType = {
    ...data,
    _id: !data?.create ? data?._id : undefined,
  };
  return isFetching ? (
    <PageLoader />
  ) : (
    <CustomerPaymentForm
      permission={parentPermission}
      title={'Manage ' + parentPermission?.name}
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CustomerPaymentCreate;
