import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useSalesReturnView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import SalesReturnForm from '../_utils/SalesReturnForm';

const EditSalesReturn: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useSalesReturnView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <SalesReturnForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={data}
      title={'Edit Sales Return'}
    />
  );
};

export default EditSalesReturn;
