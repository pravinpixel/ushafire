import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormWarehouseSchema } from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import MasterForm from '../../_utils/MasterForm';

const CreateWareHouse: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    address: '',
    status: true,
  };

  const label = parentPermission?.name ?? '';
  //Essentail
  const { data, isLoading } = useEssentialList({
    params: {
      include: ['Location'],
    },
  });

  const inputs: InputsType[] = useMemo(
    () => [
      {
        name: 'code',
        label: label + ' Code',
        type: 'text',
        md: 6,
        sm: 7,
        xs: 12,
      },
      {
        name: 'location_id',
        label: label + ' Location',
        type: 'autocomplete',
        options: data?.Location || [],
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
        name: 'address',
        label: label + ' Address',
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
        sm: 8,
        xs: 12,
      },
    ],
    [data, label, isLoading]
  );

  return (
    <MasterForm
      title={'Create New ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      label={label}
      url="/warehouse"
      defaultValue={defaultValue}
      inputs={inputs}
      validations={masterFormWarehouseSchema}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateWareHouse;
