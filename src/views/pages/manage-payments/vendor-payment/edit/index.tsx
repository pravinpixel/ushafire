import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useVendorPaymentView } from 'store/hooks/ManagePaymentHooks';

import PageLoader from 'views/components/loader/PageLoader';

import VendorPaymentForm from '../_utils/VendorPaymentForm';

const VendorPaymentEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useVendorPaymentView(id);

  return isFetching ? (
    <PageLoader />
  ) : (
    <VendorPaymentForm
      permission={parentPermission}
      navigateLink={parentPermission?.path ?? '/'}
      title={'Manage ' + parentPermission?.name}
      defaultValue={{
        ...data,
      }}
    />
  );
};

export default VendorPaymentEdit;
