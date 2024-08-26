import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterImageForm from '../../_utils/MasterImageForm';

const EditBrand: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/brand/${id}`;
  const { data, isFetching } = useMasterView(url);

  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterImageForm
      title={'Edit ' + parentPermission?.name}
      label={parentPermission?.name ?? ''}
      // navigateTo={parentPermission?.path ?? '/'}
      url={url}
      defaultValue={data}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditBrand;
