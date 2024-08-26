import { useMemo } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { masterFormCurrencySchema } from 'helper/ValidationSchema';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import MasterForm from '../../_utils/MasterForm';

const CreateCurrency: React.FC<ComponentProps> = ({ parentPermission }) => {
  const defaultValue: MasterFormType = {
    code: '',
    name: '',
    symbol: '',
    status: true,
  };
  const label = parentPermission?.name ?? '';

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
        name: 'symbol',
        label: label + ' Symbol',
        type: 'text',
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
  }, [label]);

  return (
    <MasterForm
      title={'Create New ' + label}
      // navigateTo={parentPermission?.path ?? '/'}
      url="/currency"
      label={label}
      defaultValue={defaultValue}
      inputs={inputs}
      validations={masterFormCurrencySchema}
      navigateLink={parentPermission?.path ?? '/'}
    />
  );
};

export default CreateCurrency;
