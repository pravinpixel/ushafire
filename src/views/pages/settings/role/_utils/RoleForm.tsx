import { useCallback, createContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Paper, Stack, Typography } from '@mui/material';

import { notify } from 'helper/GlobalHelper';
import { useRouter } from 'helper/CustomHooks';
import { adminFormRoleSchema } from 'helper/ValidationSchema';
import { RoleFormType, RoleContextType } from 'helper/types/AdminSettingTypes';

import { useRoleEdit, useRoleCreate } from 'store/hooks/SettingHooks';

import InputField from 'views/components/form-components/InputField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';

import Permission from './Permission';

type RoleFormPage = {
  title: string;
  defaultValues?: RoleFormType;
  navigateTo: string;
};

export const RoleContext = createContext<RoleContextType>({
  setValue: () => {},
});
export default function RoleForm({ title, defaultValues, navigateTo }: RoleFormPage) {
  const router = useRouter();
  const { control, setValue, watch, handleSubmit } = useForm<RoleFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(adminFormRoleSchema) as unknown as Resolver<RoleFormType>,
  });

  const { mutate: RoleCreate, isPending: createLoading } = useRoleCreate();
  const { mutate: RoleEdit, isPending: editLoading } = useRoleEdit();
  const handleRoleForm: SubmitHandler<RoleFormType> = useCallback(
    (data) => {
      if (data._id) {
        RoleEdit(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              router.push(navigateTo);
            },
            onError: (err) => {
              notify(err);
            },
          }
        );
      } else {
        RoleCreate(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              router.push(navigateTo);
            },
            onError: (err) => {
              notify(err);
            },
          }
        );
      }
    },
    [RoleCreate, RoleEdit, navigateTo, router]
  );

  return (
    <>
      <Typography mb={3} variant="h3">
        {title}
      </Typography>
      <Paper
        variant="form"
        component={'form'}
        onSubmit={handleSubmit(handleRoleForm)}
        sx={{
          padding: '3rem 2rem 2.5rem 2rem',
        }}
      >
        <Stack direction={'column'} gap={'30px'}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography>
          <Grid container spacing={'30px'}>
            <Grid item md={5}>
              <InputField
                name="code"
                control={control}
                label="Role ID"
                fieldProps={{
                  required: true,
                  placeholder: 'Role ID',
                  InputProps: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid item md={5}>
              <InputField name="name" control={control} label="Role Name" fieldProps={{ required: true, placeholder: 'Enter Name' }} />
            </Grid>

            <Grid item md={2}>
              <ActInactSwitchField name="status" control={control} labelProps={{ label: 'Status', required: true }} />
            </Grid>
            <Grid item xs={12} md={12}>
              <RoleContext.Provider value={{ setValue, watch }}>
                <Permission control={control} permissions={defaultValues?.access_manage ?? []} />
              </RoleContext.Provider>
            </Grid>
          </Grid>

          <LoadingButton
            loading={editLoading || createLoading}
            variant="contained"
            type="submit"
            sx={{
              width: '72px',
            }}
          >
            Save
          </LoadingButton>
        </Stack>
      </Paper>
    </>
  );
}
