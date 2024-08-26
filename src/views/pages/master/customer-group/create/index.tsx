import { MasterForm } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';

import MasterFormThree from '../../_utils/MasterFormThree';

// --------------------------------------------------------

const CreateCustomerGroup: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterForm = {
    name: '',
    status: true,
  };
  return (
    <MasterFormThree
      title={'Create New ' + parentPermission?.name}
      // navigateTo={parentPermission?.path ?? '/'}
      label={parentPermission?.name ?? ''}
      url="/customer-group"
      defaultValue={defaultValue}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateCustomerGroup;
