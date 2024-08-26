import { useRouter } from 'helper/CustomHooks';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { VendorPaymentType } from 'helper/types/manage-payments/VendorPayments';

import { useVendorPaymentPOView } from 'store/hooks/ManagePaymentHooks';

import PageLoader from 'views/components/loader/PageLoader';

import VendorPaymentForm from '../_utils/VendorPaymentForm';

const VendorPaymentCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const router = useRouter();
  const POId = {
    _id: router?.getParams('po_id') ?? undefined,
  };
  const { data, isFetching } = useVendorPaymentPOView(POId._id);

  const defaultValue: VendorPaymentType = {
    ...data,
    _id: !data?.create ? data?._id : undefined,
  };
  return isFetching ? (
    <PageLoader />
  ) : (
    <VendorPaymentForm
      permission={parentPermission}
      title={'Manage ' + parentPermission?.name}
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default VendorPaymentCreate;
