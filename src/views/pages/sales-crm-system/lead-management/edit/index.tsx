import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { ComponentProps } from 'helper/types/GlobalTypes';

import { useLeadView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import LeadForm from '../_utils/LeadForm';

const EditLead: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useLeadView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <LeadForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={{
        ...data,
        leadDate: checkDate(data?.leadDate),
      }}
      title={'Edit Lead Management'}
    />
  );
};

export default EditLead;
