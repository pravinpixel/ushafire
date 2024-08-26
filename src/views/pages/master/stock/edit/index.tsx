import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { checkDate } from 'helper/GlobalHelper';
import { InputsType } from 'helper/types/MasterType';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormStockSchema } from 'helper/ValidationSchema';

import { useMasterView } from 'store/hooks/MasterHooks';

import PageLoader from 'views/components/loader/PageLoader';

import MasterForm from '../../_utils/MasterForm';

const EditStock: React.FC<ComponentProps> = ({ parentPermission }) => {
  const { id } = useParams();
  const url = `/stock/${id}`;
  const { data, isFetching } = useMasterView(url);
  const label = parentPermission?.name ?? '';

  const inputs: InputsType[] = useMemo(
    () => [
      {
        name: 'date',
        label: label + ' Date',
        type: 'date',
        md: 6,
        sm: 8,
        xs: 12,
      },
      {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        md: 6,
        sm: 8,
        xs: 12,
      },
      {
        name: 'product_id',
        label: 'Product Name',
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
    [label]
  );
  return isFetching ? (
    <PageLoader />
  ) : (
    <MasterForm
      title={'Edit ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      label={label}
      validations={masterFormStockSchema}
      url={url}
      defaultValue={{
        ...data,
        date: checkDate(data?.date),
      }}
      inputs={inputs}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default EditStock;
