import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useBlanketOrderView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import BlanketOrderForm from '../_utils/BlanketForm';

const EditBlanketOrder: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useBlanketOrderView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <BlanketOrderForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        blanketOrderDate: checkDate(data?.blanketOrderDate),
        deliveryDate: checkDate(data?.deliveryDate),
        quotationDate: checkDate(data?.quotationDate),
      }}
      title={'Edit ' + parentPermission?.name}
    />
  );
};

export default EditBlanketOrder;
