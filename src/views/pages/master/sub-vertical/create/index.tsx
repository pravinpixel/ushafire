import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormSchemaThree } from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import MasterForm from '../../_utils/MasterForm';

const CreateSubVertical: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    status: true,
  };
  const label = parentPermission?.name ?? '';
  //Essentail
  const { data, isLoading } = useEssentialList({
    params: {
      include: ['BusinessVertical'],
    },
  });

  const inputs: InputsType[] = useMemo(() => {
    return [
      {
        name: 'code',
        label: label + ' Code',
        type: 'text',
        md: 6,
        sm: 8,
        xs: 12,
      },
      {
        name: 'vertical_id',
        label: 'Vertical Name',
        type: 'autocomplete',
        options: data?.BusinessVertical || [],
        addName: 'BusinessVertical',
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
        sm: 12,
        xs: 12,
      },
    ];
  }, [label, data, isLoading]);

  return (
    <MasterForm
      title={'Create New ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/sub-vertical"
      label={label}
      defaultValue={defaultValue}
      inputs={inputs}
      validations={masterFormSchemaThree('vertical_id', 'Vertical Name', 'Sub Vertical')}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateSubVertical;
