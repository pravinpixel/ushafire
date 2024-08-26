import { MasterForm } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTypeTwoSchema } from 'helper/ValidationSchema';

import MasterFormTwo from '../../_utils/MasterFormTwo';

// --------------------------------------------------------

const CreateLeadStatus: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterForm = {
    name: '',
    status: true,
  };
  return (
    <MasterFormTwo
      title={'Create New ' + parentPermission?.name}
      label={parentPermission?.name ?? ''}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/lead-status"
      defaultValue={defaultValue}
      validations={masterFormTypeTwoSchema(parentPermission?.name)}
      navigateLink={parentPermission?.path?? '/'}
    />
  );
};

export default CreateLeadStatus;
