import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { MasterForm } from 'helper/types/MasterType';
import { notify, errorSet } from 'helper/GlobalHelper';
import { masterFormThreeSchema } from 'helper/ValidationSchema';

import { useMasterEdit, useMasterCreate } from 'store/hooks/MasterHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';

type MasterFormType = {
  url: string;
  title: string;
  defaultValue: MasterForm;
  // navigateTo: string;
  label: string;
  navigateLink: string;
};

const MasterFormThree = ({ url, title, defaultValue, label, navigateLink }: MasterFormType) => {
  const router = useRouter();
  const form = useForm<MasterForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(masterFormThreeSchema) as Resolver<MasterForm>,
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
            // router.push(navigateTo);
            router.push(navigateLink ?? '/');
          },
          onError: (err) => {
            errorSet({ error: err, setError });
          },
        }
      );
    } else {
      await MasterCreate(
        { formData: data, url: `${url}`, method: 'post' },
        {
          onSuccess: (res) => {
            notify(res);
            // router.push(navigateTo);
            router.push(navigateLink ?? '/');
          },
          onError: (err) => {
            errorSet({ error: err, setError });
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
      {/* <Typography mb={3} variant="h3">
        {title}
      </Typography>
      <Paper component={'form'} onSubmit={handleSubmit(handleFormSumbit)} variant="form">
        <Stack direction={'column'} width={'100%'} gap={1} minHeight={{ xs: 520, sm: 500, md: 440 }} height={'100%'}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          > */}
      <Grid item xs={12} sm={7} md={6}>
        <InputField name="code" control={control} label={label + ' Code'} fieldProps={{ required: true, placeholder: 'Enter ' + label + ' Code' }} />
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <InputField
          name="slab"
          control={control}
          label={'Discount' + ' Slab'}
          fieldProps={{ required: true, placeholder: 'Enter ' + 'Discount' + ' Slab' }}
        />
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <InputField name="name" control={control} label={label + ' Name'} fieldProps={{ required: true, placeholder: 'Enter ' + label + ' Name' }} />
      </Grid>
      <Grid item xs={12} md={12}>
        <ActInactSwitchField name="status" control={control} labelProps={{ label: 'Status', required: true }} />
      </Grid>
      {/* <LoadingButton loading={createPending || editPending} sx={{ width: 79 }} variant="contained" type="submit">
        Save
      </LoadingButton> */}
      {/* </Box>
        </Stack>
      </Paper> */}
    </FormLayout>
  );
};

export default MasterFormThree;
