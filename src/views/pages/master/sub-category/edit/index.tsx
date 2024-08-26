import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { InputsType } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormSchemaThree } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';
import { useEssentialList } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterForm from '../../_utils/MasterForm';

const EditSubCategory: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/sub-category/${id}`;
  const { data, isFetching } = useMasterView(url);
  const label = parentPermission?.name ?? '';
  const { data: option, isLoading } = useEssentialList({
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
        options: option?.Category || [],
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
    [label, option?.Category, isLoading]
  );
  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterForm
      // navigateTo={parentPermission?.path ?? '/'}
      label={label}
      // permission={parentPermission}
      title={'Edit ' + parentPermission?.name}
      inputs={inputs}
      validations={masterFormSchemaThree('categoryId', 'Category', 'Sub Category')}
      url={url}
      defaultValue={data}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditSubCategory;
