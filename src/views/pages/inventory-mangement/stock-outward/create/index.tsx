import { useRouter } from 'helper/CustomHooks';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { StockOutwardTypeForm } from 'helper/types/inventory-management/StockOutwardType';

import { useStockOutwaedView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import StockOutWardForm from '../_utils/StockOutWardForm';

const StockOutWardCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const router = useRouter();
  const StockInwardId = {
    _id: router?.getParams('stock_outward_id') ?? undefined,
    view: router?.getParams('stock_outward_id') ? 'Stock Update' : undefined,
  };

  const { data, isFetching } = useStockOutwaedView(StockInwardId._id, {
    view: StockInwardId.view,
  });
  const defaultValue: StockOutwardTypeForm = {
    ...data,
    ...StockInwardId,
    // stockInwardDate: checkDate(data?.stockInwardDate),
    // poDate: checkDate(data?.poDate),
  };
  // const defaultValue: StockOutwardTypeForm = {
  //   _id: '',
  //   stockOutwardNumber: '',
  //   stockOutwardDate: '',
  //   customerId: null,
  //   modeOfTransfer: null,
  //   purpose: '',
  // };
  return isFetching ? (
    <PageLoader />
  ) : (
    <StockOutWardForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      defaultValue={defaultValue}
    />
  );
};

export default StockOutWardCreate;
