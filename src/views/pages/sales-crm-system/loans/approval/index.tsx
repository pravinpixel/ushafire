import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useLoanView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import LoansForm from '../_utils/LoansForm';

const LoansApproval: React.FC<ComponentProps> = ({ permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useLoanView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <LoansForm
      navigateLink={permission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        loanDate: checkDate(data?.loanDate),
        quotationDate: checkDate(data?.quotationDate),
        dateOfReturn: checkDate(data?.dateOfReturn),
        approvePage: true,
      }}
      title={'Approve ' + permission?.name}
    />
  );
};

export default LoansApproval;
