import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { InputsType } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormWarehouseSchema } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';
import { useEssentialList } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterForm from '../../_utils/MasterForm';

const EditWareHouse: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/warehouse/${id}`;
  const { data: defaultValue, isFetching } = useMasterView(url);
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
        sm: 8,
        xs: 12,
      },
      {
        name: 'location_id',
        label: label + ' Location',
        type: 'autocomplete',
        options: data?.Location || [],
        addName: 'Location',
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
        xs: 12,
        sm: 12,
        md: 12,
      },
    ],
    [data, label, isLoading]
  );

  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterForm
      title={'Edit ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      label={label}
      url={url}
      defaultValue={defaultValue}
      validations={masterFormWarehouseSchema}
      inputs={inputs}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditWareHouse;
