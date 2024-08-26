import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

// import LoadingButton from '@mui/lab/LoadingButton';
// import { Paper, Stack, Typography } from '@mui/material';

import { Grid } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { MasterForm } from 'helper/types/MasterType';
import { notify, errorSet, ModuleType } from 'helper/GlobalHelper';

import { useMasterEdit, useMasterCreate } from 'store/hooks/MasterHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';

type MasterFormType = {
  url: string;
  title: string;
  defaultValue: MasterForm;
  // navigateTo: string;
  // label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations: any;
  permission?: ModuleType;
  navigateLink?: string;
};

const MasterFormOne = ({ url, title, defaultValue, validations, permission, navigateLink }: MasterFormType) => {
  const router = useRouter();
  const form = useForm<MasterForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(validations) as unknown as Resolver<MasterForm>,
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync: MasterCreate } = useMasterCreate();
  const { mutateAsync: MasterEdit } = useMasterEdit();

  const handleFormSumbit: SubmitHandler<MasterForm> = async (data) => {
    if (data._id) {
      await MasterEdit(
        { formData: data, url: `${url}`, method: 'put' },
        {
          onSuccess: (res) => {
            notify(res);
            // router.push(permission?.path ?? '/');
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    } else {
      await MasterCreate(
        { formData: data, url: `${url}`, method: 'post' },
        {
          onSuccess: (res) => {
            notify(res);
            router.push(permission?.path ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    }
  };

  return (
    <FormLayout
      formProps={{
        ...form,
      }}
      title={title}
      // buttonLabel={title}
      loading={isSubmitting}
      onSumbit={handleSubmit(handleFormSumbit)}
      requiredRemove={false}
      naviagteLink={navigateLink}
      dividerRemove={true}
    >
      {/* <Typography mb={3} variant="h4">
        {title}
      </Typography>
      <Paper component={'form'} onSubmit={handleSubmit(handleFormSumbit)} variant="form">
        <Stack direction={'column'} width={{ xs: '100%', sm: '50%', md: '45%' }} gap={'30px'} height={'100%'}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography> */}
      <Grid item xs={6}>
        <InputField
          name="code"
          control={control}
          label={permission?.name + ' Code'}
          fieldProps={{ required: true, placeholder: 'Enter ' + permission?.name + ' Code' }}
        />
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <InputField
          name="name"
          control={control}
          label={permission?.name + ' Name'}
          fieldProps={{ required: true, placeholder: 'Enter ' + permission?.name + ' Name' }}
        />
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <ActInactSwitchField name="status" control={control} labelProps={{ label: 'Status', required: true }} />
      </Grid>

      {/* <LoadingButton loading={createLoading || editPending} sx={{ width: 79 }} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Stack>
      </Paper> */}
    </FormLayout>
  );
};

export default MasterFormOne;
