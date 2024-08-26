import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useSalesInvoiceView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import SalesInvoiceForm from '../_utils/SalesInvoiceForm';

const EditSalesInvoice: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useSalesInvoiceView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <SalesInvoiceForm navigateLink={parentPermission?.path ?? '/'} permission={permission} defaultValue={data} title={'Edit Sales Invoice'} />
  );
};

export default EditSalesInvoice;
