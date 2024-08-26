import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { InputsType } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormSchemaThree } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';
import { useEssentialList } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterForm from '../../_utils/MasterForm';

const EditState: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/state/${id}`;
  const { data: defaultValue, isFetching } = useMasterView(url);
  const label = parentPermission?.name ?? '';
  //Essentail
  const { data, isLoading } = useEssentialList({
    params: {
      include: ['Country'],
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
        name: 'country_id',
        label: 'Country Name',
        type: 'autocomplete',
        options: data?.Country || [],
        addName: 'Country',
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
      validations={masterFormSchemaThree('country_id', 'Country Name', 'State')}
      url={url}
      defaultValue={defaultValue}
      inputs={inputs}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditState;
