import { useFormContext } from 'react-hook-form';

import { Grid, Collapse, Typography } from '@mui/material';

import { LeadFormType } from 'helper/types/sales-crm-system/LeadManagementTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import { CustomInputLabal } from 'views/components/form-components/group-field/input-labal';

// -----------------------------------------------------------------------------

const EssentialNeed: EssentialType[] = ['Customer', 'User', 'Lead-lead-type', 'Yes-no'];

// -----------------------------------------------------------------------------

const LeadManagementDetails = () => {
  const { control, watch } = useFormContext<LeadFormType>();
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const IsReferal = watch('referralSource')?.value === 'Yes';
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Lead Management Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="leadNumber"
          control={control}
          label="Lead No"
          fieldProps={{
            placeholder: 'Enter Lead No',
            required: true,
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="leadDate"
          control={control}
          label="Lead Date"
          fieldProps={{
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="customerId"
          control={control}
          label={<CustomInputLabal setName="customerId" label="Customer" modelName={'ContactDetailForm'} />}
          addName={'Customer'}
          options={options?.Customer}
          textFieldProps={{
            placeholder: 'Select Customer',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="salePersonId"
          control={control}
          label="Sales Person"
          addName={'User'}
          options={options?.User}
          textFieldProps={{
            placeholder: 'Select Sales Person',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="leadType"
          control={control}
          label="Lead type"
          addName={'Lead-lead-type'}
          options={options?.['Lead-lead-type']}
          textFieldProps={{
            placeholder: 'Select Lead type',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="existingCustomer"
          control={control}
          label="Existing Customer"
          addName={'Yes-no'}
          options={options?.['Yes-no']}
          textFieldProps={{
            placeholder: 'Select Existing Customer',
            required: true,
          }}
          fieldProps={{
            clearIcon: false,
            disableClearable: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="referralSource"
          control={control}
          label="Referral Source"
          addName={'Yes-no'}
          options={options?.['Yes-no']}
          textFieldProps={{
            placeholder: 'Select Referral Source',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Collapse in={IsReferal}>
          <InputField
            name="referralName"
            control={control}
            label="Referral Name"
            fieldProps={{
              placeholder: 'Enter Referral Name',
              required: true,
            }}
          />
        </Collapse>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextAreaField
          name="notes"
          control={control}
          label="Requirement Note"
          fieldProps={{
            placeholder: 'Write your Requirement Note',
            required: true,
          }}
        />
      </Grid>
    </>
  );
};

export default LeadManagementDetails;
