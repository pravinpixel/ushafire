import { MasterForm } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTypeOneSchema } from 'helper/ValidationSchema';

import MasterFormOne from '../../_utils/MasterFormOne';

const CreateProductType: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterForm = {
    code: '',
    name: '',
    status: true,
  };
  return (
    <MasterFormOne
      permission={parentPermission}
      title={'Create New ' + parentPermission?.name}
      url="/product-type"
      defaultValue={defaultValue}
      validations={masterFormTypeOneSchema(parentPermission?.name)}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateProductType;
