import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useLoanReturnView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import LoanReturnForm from '../_utils/LoanReturnForm';

const EditLoanReturn: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useLoanReturnView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <LoanReturnForm navigateLink={parentPermission?.path ?? '/'} permission={permission} defaultValue={data} title={'Edit Loan Return'} />
  );
};

export default EditLoanReturn;
