import { useParams } from 'react-router-dom';

import { ComponentProps } from 'helper/types/GlobalTypes';

import { useConfigurationView } from 'store/hooks/SettingHooks';

import PageLoader from 'views/components/loader/PageLoader';

import ConfigurationForm from '../utils/ConfigureForm';

const ConfigurationEdit: React.FC<ComponentProps> = ({ parentPermission, permission }) => {
  const { id } = useParams();
  const { data, isFetching } = useConfigurationView(id);
  return isFetching ? (
    <PageLoader />
  ) : (
    <ConfigurationForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={data}
      title={'Create Configuration Details'}
    />
  );
};

export default ConfigurationEdit;
