import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { handleDisablePastDays } from 'helper/GlobalHelper';
import { LoansTypeForm } from 'helper/types/sales-crm-system/LoansTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

const EssentialNeed: EssentialType[] = ['Customer', 'User'];

function LoanDetails() {
  const { control } = useFormContext<LoansTypeForm>();
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Loan Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="loanNumber"
          control={control}
          label="Loan No"
          fieldProps={{
            placeholder: 'Enter Loan No',
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
          addName={'Customer'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="location"
          control={control}
          label="Location"
          fieldProps={{
            placeholder: 'Enter Location',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="salePersonId"
          control={control}
          label="Employee Name"
          options={options?.User}
          textFieldProps={{
            placeholder: 'Select Employee Name',
          }}
          addName={'User'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="dateOfReturn"
          control={control}
          label="Date of Return"
          fieldProps={{
            placeholder: 'Enter Date of Return',
          }}
          pickerProps={{
            shouldDisableDate: handleDisablePastDays,
            disableHighlightToday: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextAreaField
          name="purpose"
          control={control}
          label="Purpose"
          fieldProps={{
            placeholder: 'Describe the purpose',
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextAreaField
          name="remarks"
          control={control}
          label="Remarks"
          fieldProps={{
            placeholder: 'Write your Remarks',
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default LoanDetails;
