import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormSchemaThree } from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import MasterForm from '../../_utils/MasterForm';

const CreateSubCategory: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    status: true,
  };
  const label = parentPermission?.name ?? '';
  const { data, isLoading } = useEssentialList({
    params: {
      include: ['Category'],
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
        name: 'categoryId',
        label: 'Category',
        type: 'autocomplete',
        options: data?.Category || [],
        addName: 'Category',
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
      title={'Create New ' + parentPermission?.name}
      // navigateTo={parentPermission?.path ?? '/'}
      label={label}
      url="/sub-category"
      defaultValue={defaultValue}
      inputs={inputs}
      validations={masterFormSchemaThree('categoryId', 'Category', 'Sub Category')}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateSubCategory;
