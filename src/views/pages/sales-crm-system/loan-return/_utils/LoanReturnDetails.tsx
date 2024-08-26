import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { LoanReturnFormType } from 'helper/types/sales-crm-system/LoanReturnType';

import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

function LoanReturnDetails() {
  const { control } = useFormContext<LoanReturnFormType>();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Loan Return Details</Typography>
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
        <InputField
          name="loanNumber"
          control={control}
          label="Loan No"
          fieldProps={{
            placeholder: 'Enter Loan No',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DatePickerField
          name="loanDate"
          control={control}
          label="Loan Date"
          fieldProps={{
            placeholder: 'Enter Loan Date',
            InputProps: {
              readOnly: true,
            },
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
            InputProps: {
              readOnly: true,
            },
          }}
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

export default LoanReturnDetails;
