import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useBlanketOrderView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import BlanketOrderForm from '../_utils/BlanketForm';

const BlanketOrderApproval: React.FC<ComponentProps> = ({ permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useBlanketOrderView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <BlanketOrderForm
      navigateLink={permission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        blanketOrderDate: checkDate(data?.blanketOrderDate),
        deliveryDate: checkDate(data?.deliveryDate),
        quotationDate: checkDate(data?.quotationDate),
        approvePage: true,
      }}
      title={'Approve ' + permission?.name}
    />
  );
};

export default BlanketOrderApproval;
