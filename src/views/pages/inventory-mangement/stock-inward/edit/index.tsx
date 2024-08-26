import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useStockInwaedView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import StockInWardForm from '../_utils/StockInWardForm';

const StockInWardEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useStockInwaedView(id);

  return isFetching ? (
    <PageLoader />
  ) : (
    <StockInWardForm
      permission={parentPermission}
      title={'Edit ' + parentPermission?.name}
      navigateLink={parentPermission?.path ?? '/'}
      defaultValue={{
        ...data,
        poDate: checkDate(data?.poDate || ''),
        stockInwardDate: checkDate(data?.stockInwardDate || ''),
      }}
    />
  );
};

export default StockInWardEdit;
