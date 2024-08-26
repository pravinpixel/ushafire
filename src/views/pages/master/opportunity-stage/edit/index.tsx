import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTypeTwoSchema } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterFormTwo from '../../_utils/MasterFormTwo';

// --------------------------------------------------------

const EditOpportunityStage: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/opportunity-stage/${id}`;
  const { data, isFetching } = useMasterView(url);

  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterFormTwo
      title={'Edit ' + parentPermission?.name}
      label={parentPermission?.name ?? ''}
      // navigateTo={parentPermission?.path ?? '/'}
      validations={masterFormTypeTwoSchema(parentPermission?.name)}
      url={url}
      defaultValue={data}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditOpportunityStage;
