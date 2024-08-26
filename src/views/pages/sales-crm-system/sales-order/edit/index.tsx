import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { SaleOrderTypeForm } from 'helper/types/sales-crm-system/SalesOrderTypes';

import { useSalesOrderView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import SaleOrderForm from '../_utils/SalesOrderForm';

const SaleOrderEdit: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const { data, isFetching } = useSalesOrderView(id);

  const DefaultValue: SaleOrderTypeForm = {
    ...data,
    quotationDate: checkDate(data?.quotationDate),
    saleOrderDate: checkDate(data?.saleOrderDate),
    saleInvoiceCommitmentDate: checkDate(data?.saleInvoiceCommitmentDate),
  };

  return isFetching ? (
    <PageLoader />
  ) : (
    <SaleOrderForm
      permission={parentPermission}
      title={'Edit ' + parentPermission?.name}
      defaultValue={DefaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default SaleOrderEdit;
