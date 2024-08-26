import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormTemplatechema } from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import MasterForm from '../../_utils/MasterForm';

const CreateDeliveryTerms: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    status: true,
  };

  const label = parentPermission?.name ?? '';

  const inputs: InputsType[] = useMemo(() => {
    return [
      {
        name: 'name',
        label: label + ' Name',
        type: 'text',
        md: 6,
        sm: 8,
        xs: 12,
      },
      {
        name: 'status',
        label: 'Status',
        type: 'checkbox',
        md: 6,
        sm: 4,
        xs: 12,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        md: 12,
        sm: 12,
        xs: 12,
      },
    ];
  }, [label]);

  return (
    <MasterForm
      title={'Create New ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/delivery-terms"
      label={label}
      defaultValue={defaultValue}
      inputs={inputs}
      validations={masterFormTemplatechema}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateDeliveryTerms;
