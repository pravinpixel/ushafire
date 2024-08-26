import { useRouter } from 'helper/CustomHooks';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { StockInwardTypeForm } from 'helper/types/inventory-management/StockInwardType';

import { useStockInwaedView } from 'store/hooks/InventoryManagementHook';

import PageLoader from 'views/components/loader/PageLoader';

import StockInWardForm from '../_utils/StockInWardForm';

const StockInWardCreate: React.FC<ComponentProps> = ({ parentPermission }) => {
  const router = useRouter();
  const StockInwardId = {
    _id: router?.getParams('stock_inward_id') ?? undefined,
    view: router?.getParams('stock_inward_id') ? 'Stock Update' : undefined,
  };

  const { data, isFetching } = useStockInwaedView(StockInwardId._id, {
    view: StockInwardId.view,
  });
  const defaultValue: StockInwardTypeForm = {
    ...data,
    ...StockInwardId,
    // stockInwardDate: checkDate(data?.stockInwardDate),
    // poDate: checkDate(data?.poDate),
  };
  return isFetching ? (
    <PageLoader />
  ) : (
    <StockInWardForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      defaultValue={defaultValue}
    />
  );
};
/**
 * This file is part of AutoPack.
 *
 * For Stock Inward Create
 */
export default StockInWardCreate;
