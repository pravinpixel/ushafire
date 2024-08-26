import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useLoanView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import LoansForm from '../_utils/LoansForm';

const EditLoan: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useLoanView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <LoansForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        loanDate: checkDate(data?.loanDate),
        quotationDate: checkDate(data?.quotationDate),
        dateOfReturn: checkDate(data?.dateOfReturn),
      }}
      title={'Edit Loans'}
    />
  );
};

export default EditLoan;
