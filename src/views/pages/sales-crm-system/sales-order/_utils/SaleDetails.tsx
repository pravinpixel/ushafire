import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { SaleOrderTypeForm } from 'helper/types/sales-crm-system/SalesOrderTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

const EssentialNeed: EssentialType[] = ['Customer', 'PaymentTerms'];

function SaleOrderDetails() {
  const { control } = useFormContext<SaleOrderTypeForm>();
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Sale Order Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="saleOrderNumber"
          control={control}
          label="SaleOrder No"
          fieldProps={{
            placeholder: 'Enter SaleOrder No',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="saleOrderDate"
          control={control}
          label="SaleOrder Date"
          fieldProps={{
            placeholder: 'Enter SaleOrder Date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="quotationNumber"
          control={control}
          label="Quotation No"
          fieldProps={{
            placeholder: 'Enter Quotation No',
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
            placeholder: 'Enter Quotation Date',
          }}
          pickerProps={{
            readOnly: true,
          }}
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
            placeholder: 'Enter Delivery Location',
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputField
          name="billingAddress"
          control={control}
          label="Billing Address"
          fieldProps={{
            placeholder: 'Enter billing Address',
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
          name="saleInvoiceCommitmentDate"
          control={control}
          label="Sale Invoice Commitment Date"
          fieldProps={{
            placeholder: 'Enter saleInvoiceCommitmentDate',
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default SaleOrderDetails;
