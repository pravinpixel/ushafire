import { ComponentProps } from 'helper/types/GlobalTypes';
import { LoanReturnFormType } from 'helper/types/sales-crm-system/LoanReturnType';

import LoanReturnForm from '../_utils/LoanReturnForm';

const CreateLoanReturn: React.FC<ComponentProps> = ({ parentPermission }) => {
  const DefaultValue: LoanReturnFormType = {};
  return <LoanReturnForm title={parentPermission?.name ?? ''} navigateLink={parentPermission?.path ?? '/'} defaultValue={DefaultValue} />;
};

export default CreateLoanReturn;
