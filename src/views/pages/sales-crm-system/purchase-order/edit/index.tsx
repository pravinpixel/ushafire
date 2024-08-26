import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { usePurchaseOrderView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import PurchaseOrderForm from '../_utils/PurchaseOrderForm';

const PurchaseOrderEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = usePurchaseOrderView(id);

  return isFetching ? (
    <PageLoader />
  ) : (
    <PurchaseOrderForm
      permission={parentPermission}
      navigateLink={parentPermission?.path ?? '/'}
      title={'Edit ' + parentPermission?.name}
      defaultValue={{
        ...data,
        // poDate: checkDate(data?.poDate),
        // blanketOrderDate: checkDate(data?.blanketOrderDate),
        // saleOrderDate: checkDate(data?.saleOrderDate),
        // loanDate: checkDate(data?.loanDate),
      }}
    />
  );
};

export default PurchaseOrderEdit;
