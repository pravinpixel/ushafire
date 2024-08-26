import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useDealsView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import DealsForm from '../_utils/DealsForm';

const EditDeals: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useDealsView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <DealsForm navigateLink={parentPermission?.path ?? '/'} permission={permission} defaultValue={data} title={'Edit Deals Management'} />
  );
};

export default EditDeals;
