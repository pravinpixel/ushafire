import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { usePurchaseOrderView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import PurchaseOrderForm from '../../purchase-order/_utils/PurchaseOrderForm';

const EditPoRequest: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = usePurchaseOrderView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <PurchaseOrderForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        // poDate: checkDate(data?.poDate),
        // blanketDate: checkDate(data?.blanketDate),
        // saleDate: checkDate(data?.saleDate),
        // loanDate: checkDate(data?.loanDate),
      }}
      title={'Edit Po Request'}
    />
  );
};

export default EditPoRequest;
