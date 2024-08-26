import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterFormThree from '../../_utils/MasterFormThree';

// --------------------------------------------------------

const EditCustomerGroup: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/customer-group/${id}`;
  const { data, isFetching } = useMasterView(url);

  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterFormThree
      // navigateTo={parentPermission?.path ?? '/'}
      label={parentPermission?.name ?? ''}
      title={'Edit ' + parentPermission?.name}
      url={url}
      defaultValue={data}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditCustomerGroup;
