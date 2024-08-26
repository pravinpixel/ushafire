import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { QuotationFormType } from 'helper/types/sales-crm-system/QuotationTypes';

import { useQuotationView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import QuotationForm from '../_utils/QuotationForm';

const EditQuotation: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useQuotationView(id);
  const DefaultValue: QuotationFormType = {
    ...data,
    quotationDate: checkDate(data?.quotationDate),
    opportunityDate: checkDate(data?.opportunityDate),
    deliveryDate: checkDate(data?.deliveryDate),
  };
  return isFetching ? (
    <PageLoader />
  ) : (
    <QuotationForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={DefaultValue}
      title={'Edit Quotation Management'}
    />
  );
};

export default EditQuotation;
