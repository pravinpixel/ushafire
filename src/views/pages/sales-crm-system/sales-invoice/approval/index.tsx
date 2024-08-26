import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useSalesInvoiceView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import SalesInvoiceForm from '../_utils/SalesInvoiceForm';

const SalesInvoiceApproval: React.FC<ComponentProps> = ({ permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useSalesInvoiceView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <SalesInvoiceForm
      navigateLink={permission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        saleOrderDate: checkDate(data?.saleOrderDate),
        salesInvoiceDate : checkDate(data?.salesInvoiceDate),
        approvePage: true,
      }}
      title={'Approve' + permission?.name}
    />
  );
};

export default SalesInvoiceApproval;
