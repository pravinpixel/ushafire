import React, { useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, Typography, InputAdornment } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { UserFormType } from 'helper/types/AdminSettingTypes';
import { adminFormUsersSchema } from 'helper/ValidationSchema';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useUserEdit, useUserCreate } from 'store/hooks/SettingHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import CheckBoxField from 'views/components/form-components/CheckBoxField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

type UserFormPage = {
  title: string;
  defaultValues: UserFormType;
  navigateTo: string;
};
type StateProps = {
  password: boolean;
  confirm_password: boolean;
};

export default function UserForm({ title, defaultValues, navigateTo }: UserFormPage) {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState<StateProps>({
    password: false,
    confirm_password: false,
  });
  const handleClickShowPassword = (name: keyof StateProps) =>
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const form = useForm<UserFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(adminFormUsersSchema) as unknown as Resolver<UserFormType>,
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;
  const { data: options } = useEssentialList({
    params: {
      include: ['Department', 'Designation', 'UserRole', 'User-sales-target'],
    },
  });

  const { mutateAsync: UserCreate } = useUserCreate();
  const { mutateAsync: UserEdit } = useUserEdit();
  const handleUserForm: SubmitHandler<UserFormType> = useCallback(
    async (data) => {
      if (data._id) {
        UserEdit(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              push(navigateTo);
            },
            onError: (err) => {
              errorSet({ error: err, setError });
            },
          }
        );
      } else {
        UserCreate(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              push(navigateTo);
            },
            onError: (err) => {
              errorSet({ error: err, setError });
            },
          }
        );
      }
    },
    [UserCreate, UserEdit, navigateTo, push, setError]
  );

  return (
    <>
      {/* <Typography mb={3} variant="h3">
        {title}
      </Typography>
      <Paper component={'form'} onSubmit={handleSubmit(handleUserForm)} variant="form">
        <Stack direction={'column'} gap={2}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography> */}
      <FormLayout
        formProps={{
          ...form,
        }}
        title={title}
        dividerRemove={false}
        loading={isSubmitting}
        naviagteLink={navigateTo}
        onSumbit={handleSubmit(handleUserForm)}
      >
        {/* <Grid container spacing={4}> */}
        <Grid item md={6}>
          <InputField
            name="code"
            control={control}
            label="User ID"
            fieldProps={{
              required: true,
              placeholder: 'User ID',
              InputProps: {
                readOnly: true,
              },
            }}
          />
        </Grid>
        <Grid item md={6}>
          <InputField name="name" control={control} label="Name" fieldProps={{ required: true, placeholder: 'Enter Name' }} />
        </Grid>
        <Grid item md={6}>
          <InputField name="email" control={control} label="Email" fieldProps={{ required: true, placeholder: 'Enter Email' }} />
        </Grid>
        <Grid item md={6}>
          <AsyncSelectField
            name="department_id"
            control={control}
            label="Department"
            options={options?.Department}
            addName="Department"
            textFieldProps={{ required: true, placeholder: 'Select Department' }}
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
        <Grid item md={6}>
          <InputField
            name="confirm_password"
            control={control}
            label="Confirm Password"
            fieldProps={{
              required: true,
              placeholder: 'Enter Confirm Password',
              autoComplete: 'current-password',
              type: showPassword.confirm_password ? 'text' : 'password',
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('confirm_password')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword.confirm_password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid item md={6}>
          <AsyncSelectField
            name="designation_id"
            control={control}
            label="Designation"
            options={options?.Designation}
            addName="Designation"
            textFieldProps={{ required: true, placeholder: 'Select Designation' }}
          />
        </Grid>
        <Grid item md={6}>
          <ActInactSwitchField name="status" control={control} labelProps={{ label: 'Status', required: true }} />
        </Grid>
        <Grid item md={6}>
          <AsyncSelectField
            name="sales_target"
            control={control}
            label="Sales Target"
            options={options?.['User-sales-target']}
            textFieldProps={{ required: true, placeholder: 'Select Sales Target' }}
            addName="User-sales-target"
          />
        </Grid>
        <Grid item md={6}>
          <AsyncSelectField
            name="role_id"
            control={control}
            label="Roles"
            options={options?.UserRole || []}
            addName="UserRole"
            textFieldProps={{ required: true, placeholder: 'Select Roles' }}
          />
        </Grid>
        {/* </Grid> */}
        {/* <Grid container spacing={1}> */}
        <Grid item md={12}>
          <Typography variant="h6">Set business Responsiblities</Typography>
        </Grid>
        <Grid item md={12}>
          <CheckBoxField
            name="is_customer_specific"
            control={control}
            labelProps={{
              label: 'Customer Specfic',
              labelPlacement: 'end',
            }}
          />
        </Grid>
        <Grid item md={12}>
          <CheckBoxField
            name="is_brand_specific"
            control={control}
            labelProps={{
              label: 'Brand Specfic',
              labelPlacement: 'end',
            }}
          />
        </Grid>
        <Grid item md={12}>
          <CheckBoxField
            name="is_product_category_specific"
            control={control}
            labelProps={{
              label: 'Product Category Specfic',
              labelPlacement: 'end',
            }}
          />
        </Grid>
        <Grid item md={12}>
          <CheckBoxField
            name="is_business_vertical_specific"
            control={control}
            labelProps={{
              label: 'Business Vertical Specfic',
              labelPlacement: 'end',
            }}
          />
        </Grid>
        {/* <Grid item md={1} mt={2}>
            <LoadingButton fullWidth loading={createLoading || editLoading} variant="contained" type="submit">
              Save
            </LoadingButton>
          </Grid> */}
        {/* </Grid> */}
      </FormLayout>
      {/* </Stack>
      </Paper> */}
    </>
  );
}
