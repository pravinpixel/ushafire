import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { VendorPaymentType } from 'helper/types/manage-payments/VendorPayments';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';

const EssentialNeed: EssentialType[] = ['Supplier', 'PaymentTerms'];

function VendorPaymentDetail() {
  const { control } = useFormContext<VendorPaymentType>();

  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Payment Update</Typography>
      </Grid>
      <Typography variant="h6"></Typography>
      <Grid item xs={12} md={6}>
        <InputField
          name="poNumber"
          control={control}
          label="PO No"
          fieldProps={{
            placeholder: 'Enter PO No',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="poDate"
          control={control}
          label="PO date"
          fieldProps={{
            placeholder: 'Enter Po date',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="supplier"
          control={control}
          label="Supplier Name"
          options={options?.Supplier}
          textFieldProps={{
            placeholder: 'Select Supplier Name',
          }}
          fieldProps={{
            readOnly: true,
          }}
          addName={'Supplier'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="totalAmount"
          control={control}
          toFixed={2}
          label="Total Amount"
          fieldProps={{
            placeholder: 'Enter Total Amount',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="totalProduct"
          control={control}
          label="Total Product"
          fieldProps={{
            placeholder: 'Enter Total Product',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="totalPaid"
          control={control}
          label="Total Paid"
          toFixed={2}
          fieldProps={{
            placeholder: 'Enter Total Paid',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="pendingDue"
          control={control}
          label="Pending Due"
          toFixed={2}
          fieldProps={{
            placeholder: 'Enter Pending Due',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
    </>
  );
}

export default VendorPaymentDetail;
