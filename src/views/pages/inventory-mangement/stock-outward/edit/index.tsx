import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useStockOutwaedView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import StockOutWardForm from '../_utils/StockOutWardForm';

const StockOutWardEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useStockOutwaedView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <StockOutWardForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={parentPermission}
      title={'Edit ' + parentPermission?.name}
      defaultValue={{
        ...data,
      }}
    />
  );
};

export default StockOutWardEdit;
