import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTypeOneSchema } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterFormOne from '../../_utils/MasterFormOne';

const EditDesignation: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/division/${id}`;
  const { data, isFetching } = useMasterView(url);

  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterFormOne
      title={'Edit ' + parentPermission?.name}
      permission={parentPermission}
      validations={masterFormTypeOneSchema(parentPermission?.name)}
      url={url}
      defaultValue={data}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditDesignation;
