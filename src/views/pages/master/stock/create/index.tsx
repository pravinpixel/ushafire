import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormStockSchema } from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import MasterForm from '../../_utils/MasterForm';

const CreateStock: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    status: true,
  };

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
        sm: 12,
        xs: 12,
      },
    ],
    [label]
  );

  return (
    <MasterForm
      title={'Create New ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/stock"
      label="Stock"
      validations={masterFormStockSchema}
      defaultValue={defaultValue}
      inputs={inputs}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateStock;
