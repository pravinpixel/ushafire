import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { usePurchaseOrderView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import PurchaseOrderForm from '../../purchase-order/_utils/PurchaseOrderForm';

const PoRequestApproval: React.FC<ComponentProps> = ({ permission }) => {
  const { id } = useParams();
  const { data, isFetching } = usePurchaseOrderView(id);

  return isFetching ? (
    <PageLoader />
  ) : (
    <PurchaseOrderForm
      permission={permission}
      navigateLink={permission?.path ?? '/'}
      title={'Approve' + permission?.name}
      defaultValue={{
        ...data,
        poDate: checkDate(data?.poDate) ?? '',
        blanketOrderDate: checkDate(data?.blanketOrderDate),
        saleOrderDate: checkDate(data?.saleOrderDate),
        loanDate: checkDate(data?.loanDate),
        approvePage: true,
      }}
    />
  );
};

export default PoRequestApproval;
