import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { setValueConfig } from 'helper/GlobalHelper';
import { OrganizationFormType } from 'helper/types/sales-crm-system/OrganizationTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';

const EssentialNeed: EssentialType[] = ['BusinessVertical', 'PaymentTerms', 'SubVertical-BusinessVertical'];
const OrganizationDetailForm = () => {
  const { control, setValue } = useFormContext<OrganizationFormType>();

  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Organization Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="organizationName"
          control={control}
          label="Organization Name"
          fieldProps={{
            placeholder: 'Enter Organization Name',
            required: true,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="verticalTypeId"
          control={control}
          label="Vertical Type"
          addName={'SubVertical-BusinessVertical'}
          options={options?.['SubVertical-BusinessVertical']}
          textFieldProps={{
            placeholder: 'Select Vertical Type',
            required: true,
          }}
          onChange={(value) => {
            setValue('businessType', value?.parent || null, setValueConfig);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="businessType"
          control={control}
          label="Business Type"
          addName={'BusinessVertical'}
          options={options?.BusinessVertical}
          fieldProps={{
            readOnly: true,
          }}
          textFieldProps={{
            placeholder: 'Select Business Type',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="paymentTermsId"
          control={control}
          label="Payment Terms"
          addName={'PaymentTerms'}
          options={options?.PaymentTerms}
          textFieldProps={{
            placeholder: 'Select Payment Terms',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name={'contact'}
          control={control}
          label="Contact"
          fieldProps={{
            placeholder: 'Enter Contact',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="email"
          control={control}
          label="Email"
          fieldProps={{
            placeholder: 'Enter Email',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="website"
          control={control}
          label="Website"
          fieldProps={{
            placeholder: 'Enter Website',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name={'fax'}
          control={control}
          label="Fax"
          fieldProps={{
            placeholder: 'Enter Fax',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="address"
          control={control}
          label="Address"
          fieldProps={{
            placeholder: 'Enter Address',
            required: true,
          }}
        />
      </Grid>
    </>
  );
};

export default OrganizationDetailForm;
