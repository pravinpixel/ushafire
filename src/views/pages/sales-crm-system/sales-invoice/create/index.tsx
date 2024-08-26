import { ComponentProps } from 'helper/types/GlobalTypes';
import { SalesInvoiceFormType } from 'helper/types/sales-crm-system/SalesInvoiceTypes';

import SalesInvoiceForm from '../_utils/SalesInvoiceForm';

const CreateSalesInvoice: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: SalesInvoiceFormType = {};
  return <SalesInvoiceForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />;
};

export default CreateSalesInvoice;
