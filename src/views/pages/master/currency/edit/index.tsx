import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { InputsType } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormCurrencySchema } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterForm from '../../_utils/MasterForm';

const EditCurrency: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/currency/${id}`;
  const { data, isFetching } = useMasterView(url);
  const label = parentPermission?.name ?? '';
  const inputs: InputsType[] = useMemo(() => {
    return [
      {
        name: 'code',
        label: label + ' Code',
        type: 'text',
        md: 6,
      },
      {
        name: 'symbol',
        label: label + ' Symbol',
        type: 'text',
        md: 6,
      },
      {
        name: 'name',
        label: label + ' Name',
        type: 'text',
        md: 6,
      },

      {
        name: 'status',
        label: 'Status',
        type: 'checkbox',
        md: 12,
      },
    ];
  }, [label]);
  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterForm
      title={'Edit ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      label={label}
      validations={masterFormCurrencySchema}
      url={url}
      defaultValue={data}
      inputs={inputs}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditCurrency;
