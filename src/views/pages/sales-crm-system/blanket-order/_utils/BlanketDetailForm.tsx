import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { BlanketOrderFormType } from 'helper/types/sales-crm-system/BlanketOrderTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

const EssentialNeed: EssentialType[] = ['Customer', 'PaymentTerms'];

const BlanketDetailForm = () => {
  const { control } = useFormContext<BlanketOrderFormType>();
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Blanket Order Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="blanketOrderNumber"
          control={control}
          label="Blanket Order No"
          fieldProps={{
            placeholder: 'Enter Blanket Order No',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="blanketOrderDate"
          control={control}
          label="Blanket Order Date"
          fieldProps={{
            placeholder: 'Select Blanket Order Date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="quotationNumber"
          control={control}
          label="Quotation No"
          fieldProps={{
            placeholder: 'Select Quotation No',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="quotationDate"
          control={control}
          label="Quotation Date"
          fieldProps={{
            placeholder: 'Select Quotation Date',
          }}
          pickerProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="customerId"
          control={control}
          label="Customer Name"
          options={options?.Customer}
          textFieldProps={{
            placeholder: 'Select Customer Name',
          }}
          fieldProps={{
            readOnly: true,
          }}
          addName={'Customer'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="location"
          control={control}
          label="Delivery Location"
          fieldProps={{
            placeholder: 'Enter Location',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="billingAddress"
          control={control}
          label="Billing Address"
          fieldProps={{
            placeholder: 'Enter Address',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="shippingAddress"
          control={control}
          label="Shipping Address"
          fieldProps={{
            placeholder: 'Enter Shipping Address',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="paymentMode"
          control={control}
          label="Payment Mode"
          options={options?.PaymentTerms}
          textFieldProps={{
            placeholder: 'Select Payment Mode',
          }}
          addName={'PaymentTerms'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="deliveryDate"
          control={control}
          label="Delivery Date"
          fieldProps={{
            placeholder: 'Select Delivery Date',
          }}
          pickerProps={{ readOnly: true }}
        />
      </Grid>
    </React.Fragment>
  );
};

export default BlanketDetailForm;
