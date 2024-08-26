import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { SalesReturnFormType } from 'helper/types/sales-crm-system/SalesReturnTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

const EssentialNeed: EssentialType[] = ['SalesInvoice'];

function SalesReturnDetails() {
  const { control, setValue } = useFormContext<SalesReturnFormType>();
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Sales Return Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="returnNo"
          control={control}
          label="Return No"
          fieldProps={{
            placeholder: 'Enter Return No',
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DatePickerField
          name="returnDate"
          control={control}
          label="Return Date"
          fieldProps={{
            placeholder: 'Enter Return Date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="salesInvoiceId"
          control={control}
          label="Sales No"
          options={options?.SalesInvoice}
          textFieldProps={{
            placeholder: 'Select Sales No',
          }}
          onChange={(value) => {
            if (value) {
              setValue('customerId', value?.customerId)
              setValue('salesReturnItems', []);
            }else {
              setValue('salesReturnItems', []);
            }
          }}
          addName={'SalesInvoice'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="returnReason"
          control={control}
          label="Return Reason"
          fieldProps={{
            placeholder: 'Enter Return Reason',
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
            readOnly : true
          }}
          addName={'Customer'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="returnStatus"
          control={control}
          label="Return Status"
          fieldProps={{
            placeholder: 'Select Return Status',
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextAreaField
          name="remarks"
          control={control}
          label="Remarks"
          fieldProps={{
            placeholder: 'Enter Remarks',
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default SalesReturnDetails;
