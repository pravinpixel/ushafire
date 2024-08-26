import { useFormContext } from 'react-hook-form';

import { DynamicTablesNameType } from 'helper/types/GlobalTypes';
import { QuotationFormType } from 'helper/types/sales-crm-system/QuotationTypes';

import { LoanGroupTable, SaleOrderGroupTable, BlanketOrderGroupTable } from '../../_utils';

// -------------------------------------------------------------------------------------

type Props = {
  name?: DynamicTablesNameType;
};

function QuotationItems({ name = 'quotationItems' }: Props) {
  const { watch } = useFormContext<QuotationFormType>();
  const { leadType } = watch();

  switch (leadType?.label) {
    case 'Blanket':
      return <BlanketOrderGroupTable FIELDNAME={name} />;
    case 'Loan':
      return <LoanGroupTable FIELDNAME={name} />;
    default:
      return <SaleOrderGroupTable FIELDNAME={name} />;
  }
}

export default QuotationItems;
