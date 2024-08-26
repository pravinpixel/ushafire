import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useOrganizationView } from 'store/hooks/SalesCrmSystemHook';

import PageLoader from 'views/components/loader/PageLoader';

import OrganizationForm from '../_utils/OrganizationForm';

const EditOrganization: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useOrganizationView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <OrganizationForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={data}
      title={'Edit ' + parentPermission?.name}
    />
  );
};

export default EditOrganization;
