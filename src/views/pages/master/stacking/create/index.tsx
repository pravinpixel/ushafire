import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormSchemaThree} from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import MasterForm from '../../_utils/MasterForm';

const CreateStacking: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    status: true,
  };

  const label = parentPermission?.name ?? '';
  //Essentail
  const { data, isLoading } = useEssentialList({
    params: {
      include: ['Rack'],
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
        name: 'rack_id',
        label: 'Rack Name',
        type: 'autocomplete',
        options: data?.Rack || [],
        addName: 'Rack',
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
        md: 12,
        xs: 12,
        sm: 12,
      },
    ],
    [data, label, isLoading]
  );

  return (
    <MasterForm
      title={'Create New ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/stacking"
      label={label}
      defaultValue={defaultValue}
      inputs={inputs}
      validations={masterFormSchemaThree('rack_id', 'Rack', 'Stack')}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateStacking;
