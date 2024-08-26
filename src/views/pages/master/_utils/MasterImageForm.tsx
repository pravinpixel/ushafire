import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { MasterForm } from 'helper/types/MasterType';
import { notify, errorSet } from 'helper/GlobalHelper';
import { masterImageFormSchema } from 'helper/ValidationSchema';

import { useMasterEdit, useMasterCreate } from 'store/hooks/MasterHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';
import ImageUploadField from 'views/components/form-components/ImageUploadField';

type MasterFormType = {
  url: string;
  title: string;
  defaultValue: MasterForm;
  // navigateTo: string;
  label: string;
  navigateLink: string;
};

const MasterImageForm = ({ url, title, defaultValue, label, navigateLink }: MasterFormType) => {
  const router = useRouter();
  const form = useForm<MasterForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(masterImageFormSchema) as Resolver<MasterForm>,
    mode: 'all',
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
        { formData: data, url: `${url}`, method: 'putForm' },
        {
          onSuccess: (res) => {
            notify(res);
            // router.push(navigateTo);
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    } else {
      await MasterCreate(
        { formData: data, url: `${url}`, method: 'postForm' },
        {
          onSuccess: (res) => {
            notify(res);
            // router.push(navigateTo);
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    }
  };

  return (
    <>
      {/* <Typography mb={3} variant="h3">
        {title}
      </Typography>
      <Paper component={'form'} onSubmit={handleSubmit(handleFormSumbit)} variant="form">
        <Stack direction={'column'} gap={2} height={'100%'}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography> */}
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
        <Grid container spacing={'30px'}>
          <Grid item xs={12} sm={7} md={6} lg={6} rowSpacing={8}>
            <InputField
              name="code"
              control={control}
              label={label + ' Code'}
              fieldProps={{
                required: true,
                placeholder: 'Enter ' + label + ' Code',
                sx: {
                  marginBottom: '0.75rem',
                },
              }}
            />
            <InputField
              name="name"
              control={control}
              label={label + ' Name'}
              fieldProps={{
                required: true,
                placeholder: 'Enter ' + label + ' Name',
                sx: {
                  marginBottom: '0.75rem',
                },
              }}
            />
            <ActInactSwitchField name="status" control={control} labelProps={{ label: 'Status', required: true }} />
          </Grid>
          <Grid item xs={12} sm={7} md={6} lg={6}>
            <ImageUploadField
              name="brand_logo"
              control={control}
              label={label + ' Logo'}
              fieldProps={{ required: true, placeholder: 'Enter ' + label + ' Name' }}
            />
          </Grid>
        </Grid>

        {/* <LoadingButton loading={createPending || editPending} sx={{ width: 79 }} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Stack>
      </Paper> */}
      </FormLayout>
    </>
  );
};

export default MasterImageForm;
