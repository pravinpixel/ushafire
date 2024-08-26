import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTypeOneSchema } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterFormOne from '../../_utils/MasterFormOne';

// --------------------------------------------------------

const EditBusinessVertical: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/business-vertical/${id}`;
  const { data, isFetching } = useMasterView(url);

  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterFormOne
      permission={parentPermission}
      title={'Edit ' + parentPermission?.name}
      url={url}
      validations={masterFormTypeOneSchema(parentPermission?.name)}
      defaultValue={data}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditBusinessVertical;
