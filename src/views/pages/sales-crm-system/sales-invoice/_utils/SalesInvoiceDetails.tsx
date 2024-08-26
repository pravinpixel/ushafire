import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { SalesInvoiceFormType } from 'helper/types/sales-crm-system/SalesInvoiceTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

import PurchaseOrderTypeDetails from '../../purchase-order/_utils/PurchaseOrderTypeDetails';

const EssentialNeed: EssentialType[] = ['PaymentTerms'];

function SalesInvoiceDetails() {
  const { control } = useFormContext<SalesInvoiceFormType>();
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Sales Invoice Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="salesInvoiceNo"
          control={control}
          label="Sale Invoice No"
          fieldProps={{
            placeholder: 'Enter Sale Invoice No',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DatePickerField
          name="salesInvoiceDate"
          control={control}
          label="Sale Invoice Date"
          fieldProps={{
            placeholder: 'Enter Sale Invoice Date',
          }}
        />
      </Grid>
      <PurchaseOrderTypeDetails />
      {/* <Grid item xs={12} md={6}>
        <InputField
          name="saleOrderId"
          control={control}
          label="Sale Order No"
          fieldProps={{
            placeholder: 'Select Sale Order No',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="saleOrderDate"
          control={control}
          label="Sale Order Date"
          fieldProps={{
            placeholder: 'Select Sale Order Date',
          }}
          pickerProps={{ readOnly: true }}
        />
      </Grid> */}
      <Grid item xs={12} md={6}>
        <InputField
          name="contact"
          control={control}
          label="Contact"
          fieldProps={{
            placeholder: 'Select Contact',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="service"
          control={control}
          label="Service"
          fieldProps={{
            placeholder: 'Enter Service',
            // InputProps: {
            //   readOnly: true,
            // },
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
        <AsyncSelectField
          name="termOfPayment"
          control={control}
          label="Terms of Payment"
          options={options?.PaymentTerms}
          textFieldProps={{
            placeholder: 'Select Terms of Payment',
          }}
          // fieldProps={{
          //   readOnly: true,
          // }}
          addName={'PaymentTerms'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <AsyncSelectField
          name="transportMode"
          control={control}
          label="Transport Mode"
          options={options?.TransportMode}
          textFieldProps={{
            placeholder: 'Select Transport Mode',
          }}
          addName={'TransportMode'}
        /> */}
        <InputField
          name="transportMode"
          control={control}
          label="Transport Mode"
          fieldProps={{
            placeholder: 'Enter Transport Mode',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="vehicleNumber"
          control={control}
          label="Vehicle Number"
          fieldProps={{
            placeholder: 'Enter Vehicle Number',
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default SalesInvoiceDetails;
