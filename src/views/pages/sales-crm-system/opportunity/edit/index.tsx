import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useOpportunityView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import OpportunityForm from '../_utils/OpportunityForm';

const EditOpportunity: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useOpportunityView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <OpportunityForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        opportunityDate: checkDate(data?.opportunityDate),
        leadDate: checkDate(data?.leadDate),
      }}
      title={'Edit Opportunity Management'}
    />
  );
};

export default EditOpportunity;
