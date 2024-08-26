import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { QuotationQualificationOptions } from 'helper/GlobalHelper';
import { QuotationFormType } from 'helper/types/sales-crm-system/QuotationTypes';

import InputField from 'views/components/form-components/InputField';
import RadioGroupField from 'views/components/form-components/RadioGroupField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

const QuotationDetailsForm = () => {
  const { control } = useFormContext<QuotationFormType>();

  return (
    <>
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
            placeholder: 'Select Quotation Date',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="opportunityNumber"
          control={control}
          label="Opportunity No"
          fieldProps={{
            placeholder: 'Enter Opportunity No',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="opportunityDate"
          control={control}
          label="Opportunity Date"
          fieldProps={{
            placeholder: 'Opportunity Date',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="customerId"
          control={control}
          label="Cutomer"
          textFieldProps={{
            placeholder: 'Select Customer',
          }}
          fieldProps={{
            readOnly: true,
          }}
          addName={'Customer'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="leadType"
          control={control}
          label="Lead Type"
          textFieldProps={{
            placeholder: 'Select Lead Type',
          }}
          fieldProps={{
            readOnly: true,
          }}
          addName={'Lead-lead-type'}
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
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="salePersonId"
          control={control}
          label="Sales Person"
          textFieldProps={{
            placeholder: 'Select Sales Person',
          }}
          fieldProps={{
            readOnly: true,
          }}
          addName={'User-sales-target'}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Generate Quotation By</Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroupField control={control} name="generateQuotationBy" options={QuotationQualificationOptions} />
      </Grid>
    </>
  );
};

export default QuotationDetailsForm;
