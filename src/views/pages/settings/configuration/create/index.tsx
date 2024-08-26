import { ComponentProps } from 'helper/types/GlobalTypes';
import { ConfigurationFormType } from 'helper/types/AdminSettingTypes';

import ConfigurationForm from '../utils/ConfigureForm';

const ConfigurationCreate: React.FC<ComponentProps> = ({ permission, parentPermission }) => {
  const defaultValue: ConfigurationFormType = {
    status: true,
    type_id: '',
    text: '',
    image_storage: 'local',
  };
  return (
    <ConfigurationForm
      navigateLink={parentPermission?.path ?? '/'}
      permission={permission}
      defaultValue={defaultValue}
      title={'Create Configuration Details'}
    />
  );
};

export default ConfigurationCreate;
