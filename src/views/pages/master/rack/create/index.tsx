import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormSchemaThree } from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import MasterForm from '../../_utils/MasterForm';

const CreateRack: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    status: true,
  };
  const label = parentPermission?.name ?? '';
  //Essentail
  const { data, isLoading } = useEssentialList({
    params: {
      include: ['Bay'],
    },
  });

  const inputs: InputsType[] = useMemo(
    () => [
      {
        name: 'code',
        label: label + ' Code',
        type: 'text',
        md: 6,
        sm: 8,
        xs: 12,
      },
      {
        name: 'bay_id',
        label: 'Bay Name',
        type: 'autocomplete',
        options: data?.Bay || [],
        addName: 'Bay',
        loading: isLoading,
        md: 6,
        sm: 8,
        xs: 12,
      },
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
        xs: 12,
        sm: 12,
        md: 12,
      },
    ],
    [data, label, isLoading]
  );
  return (
    <MasterForm
      title={'Create New ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/rack"
      label={label}
      validations={masterFormSchemaThree('bay_id', 'Bay', 'Rack')}
      defaultValue={defaultValue}
      inputs={inputs}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateRack;
