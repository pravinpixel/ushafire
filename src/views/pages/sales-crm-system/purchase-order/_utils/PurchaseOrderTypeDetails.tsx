import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid } from '@mui/material';

import { PurchaseOrderTypeForm } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';

const TypeFields = ({ type, label }: { type: PurchaseOrderTypeForm['requestFromField']; label: PurchaseOrderTypeForm['requestFrom'] }) => {
  const dateName = (type + 'Date') as keyof PurchaseOrderTypeForm;
  const name = (type + 'Number') as keyof PurchaseOrderTypeForm;
  const { control } = useFormContext<PurchaseOrderTypeForm>();
  return (
    <Fragment key={type}>
      <Grid item xs={12} md={6}>
        <InputField
          label={label + ' Number'}
          control={control}
          name={name}
          fieldProps={{
            placeholder: 'Enter ' + label + ' No',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name={dateName}
          control={control}
          label={label + ' Date'}
          fieldProps={{
            placeholder: 'Enter' + label + ' Date',
          }}
          pickerProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Fragment>
  );
};

const PurchaseOrderTypeDetails = () => {
  const { watch } = useFormContext<PurchaseOrderTypeForm>();

  const requestFrom = watch('requestFromField') || null;
  const requestFromLabel = watch('requestFrom') || null;

  switch (requestFrom) {
    case 'blanketOrder':
      return <TypeFields type={requestFrom} label={requestFromLabel} />;
    case 'loan':
      return <TypeFields type={requestFrom} label={requestFromLabel} />;
    case 'saleOrder':
      return <TypeFields type={requestFrom} label={requestFromLabel} />;
    case 'quotation':
      return <TypeFields type={requestFrom} label={requestFromLabel} />;
    default:
      break;
  }
};

export default PurchaseOrderTypeDetails;
