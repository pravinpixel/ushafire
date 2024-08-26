import { MasterForm } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTypeOneSchema } from 'helper/ValidationSchema';

import MasterFormOne from '../../_utils/MasterFormOne';

const CreateDesignation: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterForm = {
    code: '',
    name: '',
    status: true,
  };
  return (
    <MasterFormOne
      title={'Create New ' + parentPermission?.name}
      permission={parentPermission}
      url="/division"
      validations={masterFormTypeOneSchema(parentPermission?.name)}
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateDesignation;
