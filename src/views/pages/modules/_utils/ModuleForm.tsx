/* eslint-disable max-lines */
import { Fragment, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Control, useForm, Resolver, SubmitHandler } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Paper, Stack, Typography, checkboxClasses } from '@mui/material';

import { CheckCloseIcon } from 'theme/svg';

import { useRouter } from 'helper/CustomHooks';
import { modulesChildSchema } from 'helper/ValidationSchema';
import { ChildModuleFormType } from 'helper/types/AdminSettingTypes';
// import { adminFormParentModuleSchema } from 'helper/ValidationSchema';
import { notify, errorSet, capitalizeFirstLetter } from 'helper/GlobalHelper';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useChildModuleEdit, useParentModuleEdit, useChildModuleCreate, useParentModuleCreate } from 'store/hooks/ModuleHooks';

import InputField from 'views/components/form-components/InputField';
import CheckBoxField from 'views/components/form-components/CheckBoxField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

import AddMoreFields from './AddMoreFields';

type ParentModuleFormPage = {
  title: string;
  defaultValues?: ChildModuleFormType;
  type: 'parent' | 'child';
};

const CheckBox = ({ name, control, page }: { name: string; control: Control; page?: string }) => (
  <CheckBoxField
    name={name}
    control={control as never}
    labelProps={{
      label: capitalizeFirstLetter(page || name),
      labelPlacement: 'end',
    }}
    fieldProps={{
      color: 'success',
      icon: <CheckCloseIcon />,
      sx: ({ palette }) => {
        return {
          color: palette.error.main,
          '&.Mui-checked': {
            color: palette.success.main,
          },
          [`&.${checkboxClasses.root}.Mui-disabled `]: {
            color: palette.error.main,
            '&.Mui-checked': {
              color: palette.success.main,
            },
          },
        };
      },
    }}
  />
);

export default function ModuleForm({ title, defaultValues, type }: ParentModuleFormPage) {
  const url = `/module/${type}-module`;
  const router = useRouter();
  const { control, setError, handleSubmit } = useForm<ChildModuleFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(modulesChildSchema) as unknown as Resolver<ChildModuleFormType>,
  });
  const { mutate: ParentModuleCreate, isPending: parentAddLoading } = useParentModuleCreate();
  const { mutate: ChildModuleCreate, isPending: childAddLoading } = useChildModuleCreate();
  const { mutate: ChildModuleEdit, isPending: childEditLoading } = useChildModuleEdit();
  const { mutate: ParentModuleEdit, isPending: parentEditLoading } = useParentModuleEdit();
  const handleParentModuleForm: SubmitHandler<ChildModuleFormType> = useCallback(
    (data) => {
      if (data._id) {
        ParentModuleEdit(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              router.push(url);
            },
            onError: (err) => {
              errorSet({ error: err, setError });
            },
          }
        );
      } else {
        ParentModuleCreate(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              router.push(url);
            },
            onError: (err) => {
              errorSet({ error: err, setError });
            },
          }
        );
      }
    },
    [ParentModuleCreate, ParentModuleEdit, router, setError, url]
  );

  const handleChildModuleForm: SubmitHandler<ChildModuleFormType> = useCallback(
    (data) => {
      data.all = false;
      if (data._id) {
        ChildModuleEdit(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              router.push(url);
            },
            onError: (err) => {
              errorSet({ error: err, setError });
            },
          }
        );
      } else {
        ChildModuleCreate(
          { formData: data },
          {
            onSuccess: (res) => {
              notify(res);
              router.push(url);
            },
            onError: (err) => {
              errorSet({ error: err, setError });
            },
          }
        );
      }
    },
    [ChildModuleCreate, ChildModuleEdit, router, setError, url]
  );

  const { data: options, isFetching } = useEssentialList({
    params: {
      include: ['UserRoleParent'],
    },
  });

  return (
    <>
      <Typography mb={3} variant="h3">
        {title}
      </Typography>
      <Paper
        component={'form'}
        onSubmit={type === 'child' ? handleSubmit(handleChildModuleForm) : handleSubmit(handleParentModuleForm)}
        variant="form"
        sx={{
          padding: '3rem 2rem 2.5rem 2rem',
        }}
      >
        <Stack direction={'column'} gap={'30px'}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography>
          <Grid container gap={'10px'}>
            <Grid item md={12} display={'none'}>
              <CheckBoxField
                control={control as never}
                name={'show'}
                labelProps={{
                  label: 'Show',
                  labelPlacement: 'end',
                }}
                fieldProps={{
                  color: 'success',
                  icon: <CheckCloseIcon />,
                  sx: ({ palette }) => {
                    return {
                      color: palette.error.main,
                      '&.Mui-checked': {
                        color: palette.success.main,
                      },
                      [`&.${checkboxClasses.root}.Mui-disabled `]: {
                        color: palette.error.main,
                        '&.Mui-checked': {
                          color: palette.success.main,
                        },
                      },
                    };
                  },
                }}
              />
            </Grid>
            {type === 'child' && (
              <Grid item md={4}>
                <AsyncSelectField
                  name="parent_id"
                  control={control as never}
                  label="Parent"
                  loading={isFetching}
                  options={
                    options?.UserRoleParent || [
                      {
                        label: 'Master',
                        value: 'master',
                        slug: 'master',
                      },
                      {
                        label: 'Dashboard',
                        value: 'dashboard',
                        slug: 'dashboard',
                      },
                    ]
                  }
                  textFieldProps={{
                    required: true,
                    placeholder: 'Enter Parent',
                    disabled: false,
                  }}
                  addName={'UserRoleParent'}
                />
              </Grid>
            )}

            <Grid item md={4}>
              <InputField
                name="name"
                control={control as never}
                label="Name"
                fieldProps={{
                  required: true,
                  placeholder: 'Enter Name',
                  disabled: false,
                }}
              />
            </Grid>

            <AddMoreFields name="addMore" control={control as never} />

            {['view', 'add', 'edit'].map((page, index) => {
              return (
                <Fragment key={index}>
                  <Grid item md={3} display={'none'}>
                    <InputField
                      name={page + '.path'}
                      control={control as never}
                      label="Path"
                      fieldProps={{
                        required: true,
                        placeholder: 'Enter Path',
                        disabled: true,
                      }}
                    />
                  </Grid>

                  <Grid item md={2}>
                    <CheckBoxField
                      control={control as never}
                      name={page + '.show'}
                      labelProps={{
                        label: capitalizeFirstLetter(page),
                        labelPlacement: 'end',
                      }}
                      fieldProps={{
                        color: 'success',
                        icon: <CheckCloseIcon />,
                        sx: ({ palette }) => {
                          return {
                            color: palette.error.main,
                            '&.Mui-checked': {
                              color: palette.success.main,
                            },
                            [`&.${checkboxClasses.root}.Mui-disabled `]: {
                              color: palette.error.main,
                              '&.Mui-checked': {
                                color: palette.success.main,
                              },
                            },
                          };
                        },
                      }}
                    />
                  </Grid>
                </Fragment>
              );
            })}

            {['export', 'delete'].map((page, index) => {
              return (
                <Grid item md={2} key={index}>
                  <CheckBoxField
                    name={page + '.show'}
                    control={control as never}
                    labelProps={{
                      label: capitalizeFirstLetter(page),
                      labelPlacement: 'end',
                    }}
                    fieldProps={{
                      color: 'success',
                      icon: <CheckCloseIcon />,
                      sx: ({ palette }) => {
                        return {
                          color: palette.error.main,
                          '&.Mui-checked': {
                            color: palette.success.main,
                          },
                          [`&.${checkboxClasses.root}.Mui-disabled `]: {
                            color: palette.error.main,
                            '&.Mui-checked': {
                              color: palette.success.main,
                            },
                          },
                        };
                      },
                    }}
                  />
                </Grid>
              );
            })}

            <Grid item md={2}>
              <CheckBox name="configuration" control={control} />
            </Grid>
          </Grid>

          <LoadingButton
            loading={parentAddLoading || parentEditLoading || childAddLoading || childEditLoading}
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
