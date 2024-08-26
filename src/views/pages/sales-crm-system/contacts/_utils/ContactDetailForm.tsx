import React from 'react';
import { useFormContext } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, Stack, Collapse, Typography, IconButton, InputAdornment } from '@mui/material';

import { ContactsTypeForm } from 'helper/types/sales-crm-system/ContactsTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useGenratePassword } from 'store/hooks/SalesCrmSystemHook';

import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import ImageUploadField from 'views/components/form-components/ImageUploadField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import { CustomInputLabal } from 'views/components/form-components/group-field/input-labal';

type StateProps = {
  password: boolean;
  confirm_password: boolean;
};
const EssentialNeed: EssentialType[] = ['Product', 'Language-preference', 'Gender', 'Contact-contact-type', 'Preferred-contact', 'Organization'];

const ContactDetailForm = () => {
  const [showPassword, setShowPassword] = React.useState<StateProps>({
    password: false,
    confirm_password: false,
  });
  const { control, watch, setValue } = useFormContext<ContactsTypeForm>();
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const { mutateAsync, isPending } = useGenratePassword();
  const IsBusiness = watch('contactType')?.value === 'Business';
  const handleGenartePassword = async () => {
    mutateAsync(undefined, {
      onSuccess: (res) => setValue('password', res.password, { shouldValidate: true }),
    });
  };
  const handleClickShowPassword = (name: keyof StateProps) =>
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Contacts Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="customerName"
          control={control}
          label="Customer Name"
          fieldProps={{
            placeholder: 'Enter Customer Name',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="mobile"
          control={control}
          label="Mobile No"
          fieldProps={{
            placeholder: 'Enter Mobile No',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name="alternativeMobileNumber"
          control={control}
          label="Alternative Mobile No"
          fieldProps={{
            placeholder: 'Enter Alternative Mobile No',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="preferredContactMethod"
          control={control}
          label="Preferred Contact Method"
          options={options?.['Preferred-contact']}
          textFieldProps={{
            placeholder: 'Select Preferred Contact Method',
          }}
          addName={'Preferred-contact'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="address"
          control={control}
          label="Address"
          fieldProps={{
            placeholder: 'Enter Address',
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
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="contactType"
          control={control}
          label="Contact Type"
          options={options?.['Contact-contact-type']}
          textFieldProps={{
            placeholder: 'Select Contact Type',
          }}
          addName={'Contact-contact-type'}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputField
          name="designation"
          control={control}
          label="Designation"
          fieldProps={{
            placeholder: 'Enter Designation',
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Collapse in={IsBusiness}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <AsyncSelectField
                name="company"
                control={control}
                label={
                  <CustomInputLabal
                    setName="company"
                    label="Company"
                    onSuccess={(res) => setValue('website', res?.website)}
                    modelName={'OrganizationDetailForm'}
                  />
                }
                options={options?.Organization}
                textFieldProps={{
                  placeholder: 'Select Company',
                }}
                addName={'Organization'}
                onChange={(res) => setValue('website', res.website)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                name="website"
                control={control}
                label="Website"
                fieldProps={{
                  placeholder: 'Enter Website',
                  InputProps: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Grid item xs={12} md={6}>
        <ImageUploadField
          name="customerPhoto"
          control={control}
          label="Customer photo"
          fieldProps={{ required: true, placeholder: 'Enter Customer photo' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="gender"
          control={control}
          label="Gender"
          options={options?.Gender}
          textFieldProps={{
            placeholder: 'Select Gender',
          }}
          addName={'Gender'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="languagePreference"
          control={control}
          label="Language Preference"
          options={options?.['Language-preference']}
          textFieldProps={{
            placeholder: 'Select Language Preference',
          }}
          addName={'Language-preference'}
        />
      </Grid>
      <Grid item md={6}>
        <InputField
          name="password"
          control={control}
          label="Password"
          fieldProps={{
            required: true,
            placeholder: 'Enter Password',
            autoComplete: 'current-password',
            type: showPassword.password ? 'text' : 'password',
            InputProps: {
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('password')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack alignItems={'flex-end'}>
          <LoadingButton loading={isPending} variant="contained" type="button" onClick={() => handleGenartePassword()}>
            Generate password
          </LoadingButton>
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextAreaField
          name="comments"
          control={control}
          label="Notes/Comments"
          fieldProps={{
            placeholder: 'Write your Notes/Comments',
          }}
        />
      </Grid>
    </>
  );
};

export default ContactDetailForm;
