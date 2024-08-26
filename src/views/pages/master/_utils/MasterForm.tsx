import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { InputsType, MasterForm as MasterFormType } from 'helper/types/MasterType';

import { useMasterEdit, useMasterCreate } from 'store/hooks/MasterHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';
import NumberInputField from 'views/components/form-components/NumberInputField';

type MasterFormPropsType = {
  url: string;
  title: string;
  defaultValue: MasterFormType;
  // navigateTo: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validations: any;
  navigateLink: string;
  inputs: InputsType[];
};

const MasterForm = ({ url, title, defaultValue, validations, inputs, navigateLink }: MasterFormPropsType) => {
  const router = useRouter();
  const form = useForm<MasterFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(validations) as unknown as Resolver<MasterFormType>,
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync: MasterCreate } = useMasterCreate();
  const { mutateAsync: MasterEdit } = useMasterEdit();

  const handleFormSumbit: SubmitHandler<MasterFormType> = async (data) => {
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
      <Paper variant="form" component={'form'} onSubmit={handleSubmit(handleFormSumbit)}>
        <Stack direction={'column'} width={'100%'} gap={2}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
            <Grid container spacing={'30px'}> */}
      {inputs?.map((input, index) => {
        switch (input.type) {
          case 'checkbox':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <ActInactSwitchField name={input.name} control={control} labelProps={{ label: 'Status', required: true }} />
              </Grid>
            );
          case 'autocomplete':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <AsyncSelectField
                  name={input.name}
                  control={control}
                  label={input.label}
                  options={input?.options || []}
                  textFieldProps={{ required: true, placeholder: 'Select ' + input.label }}
                  addName={input.addName as EssentialType}
                />
              </Grid>
            );
          case 'number':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <NumberInputField
                  key={index}
                  name={input.name}
                  control={control}
                  label={input.label}
                  fieldProps={{ required: true, placeholder: 'Enter ' + input.label }}
                />
              </Grid>
            );
          case 'date':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <DatePickerField
                  control={control}
                  name={input.name}
                  label={input.label}
                  fieldProps={{ required: true, placeholder: 'Enter ' + input.label }}
                />
              </Grid>
            );
          case 'textarea':
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <TextAreaField
                  control={control}
                  name={input.name}
                  label={input.label}
                  fieldProps={{ required: true, placeholder: 'Enter ' + input.label }}
                />
              </Grid>
            );
          default:
            return (
              <Grid item xs={input.xs} sm={input.sm} md={input.md} key={index}>
                <InputField
                  key={index}
                  name={input.name}
                  control={control}
                  label={input.label}
                  fieldProps={{ required: true, placeholder: 'Enter ' + input.label }}
                />
              </Grid>
            );
        }
      })}
      {/* </Grid>

            <LoadingButton loading={editLoading || createLoading} sx={{ width: 79, marginTop: 2 }} variant="contained" type="submit">
              Save
            </LoadingButton>
          </Box>
        </Stack>
      </Paper> */}
    </FormLayout>
  );
};

export default MasterForm;
