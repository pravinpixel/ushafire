import { MasterForm } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';

import MasterImageForm from '../../_utils/MasterImageForm';

const CreateBrand: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterForm = {
    code: '',
    name: '',
    status: true,
  };
  return (
    <MasterImageForm
      title={'Create New ' + parentPermission?.name}
      label={parentPermission?.name ?? ''}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/brand"
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateBrand;
