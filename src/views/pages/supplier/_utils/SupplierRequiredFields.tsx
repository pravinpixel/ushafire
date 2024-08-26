import { Control } from 'react-hook-form';

import { Grid } from '@mui/material';

import { SupplierTypeForm } from 'helper/types/SupplierTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import InputField from 'views/components/form-components/InputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';

interface SupplierRequiredFieldsType {
  control: Control<SupplierTypeForm>;
}

export default function SupplierRequiredFields({ control }: SupplierRequiredFieldsType) {
  const { data: options } = useEssentialList({
    params: {
      include: ['Brand', 'PaymentTerms'],
    },
  });
  return (
    <>
      <Grid item md={6}>
        {/* <AutoGenerateSkuField
          name={'code'}
          control={control}
          vision="Supplier"
          label="Supplier"
          fieldProps={{
            placeholder: 'Enter Suppier Code',
          }}
          checkBoxProps={{
            label: 'Auto Generate Code',
          }}
        /> */}
        <InputField
          name="code"
          control={control}
          label="Supplier Code"
          fieldProps={{
            required: true,
            placeholder: 'Enter Supplier Code',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField name="name" control={control} label="Supplier Name" fieldProps={{ required: true, placeholder: 'Enter Supplier Name' }} />
      </Grid>
      <Grid item md={6}>
        <InputField
          name="contact_person"
          control={control}
          label="Contact Person"
          fieldProps={{ required: true, placeholder: 'Enter Contact Person' }}
        />
      </Grid>
      <Grid item md={6}>
        <AsyncSelectField
          name="brand_id"
          control={control}
          label="Brand"
          options={options?.Brand}
          addName="Brand"
          textFieldProps={{ required: true, placeholder: 'Select Brand' }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField name="address" control={control} label="Address" fieldProps={{ required: true, placeholder: 'Enter Address' }} />
      </Grid>
      <Grid item md={6}>
        <NumberInputField
          name="contact_number"
          control={control}
          label="Contact No"
          fieldProps={{ required: true, placeholder: 'Enter Contact No' }}
        />
        {/* <PhoneInputField 
        name="contact_number"
        defaultValue={'SG'}
        control={control}
        label="Contact No"
        fieldProps={{ required: true, placeholder: 'Enter Contact No'}} /> */}
      </Grid>
      <Grid item md={6}>
        <InputField name="email" control={control} label="Email" fieldProps={{ required: true, placeholder: 'Enter Email' }} />
      </Grid>
      <Grid item md={6}>
        <AsyncSelectField
          name="payment_terms_id"
          control={control}
          label="Payment Terms"
          options={options?.PaymentTerms}
          addName="PaymentTerms"
          textFieldProps={{ required: true, placeholder: 'Select Payment Terms' }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField
          name="products_deals_with"
          control={control}
          label="Products Deals with"
          fieldProps={{ required: true, placeholder: 'Enter Products Deals with' }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField name="website" control={control} label="Website" fieldProps={{ required: true, placeholder: 'Enter Website' }} />
      </Grid>
    </>
  );
}
