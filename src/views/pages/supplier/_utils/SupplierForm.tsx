import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

// import LoadingButton from '@mui/lab/LoadingButton';
// import { Paper, Stack, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { supplierFormSchema } from 'helper/ValidationSchema';
import { SupplierTypeForm } from 'helper/types/SupplierTypes';

import { useSupplierEdit, useSupplierCreate } from 'store/hooks/SupplierHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';

import SupplierRequiredFields from './SupplierRequiredFields';

type SupplierFormType = {
  title: string;
  defaultValues: SupplierTypeForm;
};

const SupplierForm = ({ title, defaultValues }: SupplierFormType) => {
  const { push } = useRouter();
  const form = useForm<SupplierTypeForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(supplierFormSchema) as unknown as Resolver<SupplierTypeForm>,
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const url = '/supplier';

  const { mutate: SupplierCreate } = useSupplierCreate();
  const { mutate: SupplierEdit } = useSupplierEdit();

  const handleFormSumbit: SubmitHandler<SupplierTypeForm> = (data) => {
    if (data._id) {
      SupplierEdit(
        { formData: data },
        {
          onSuccess: (res) => {
            notify(res);
            push(url);
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    } else {
      SupplierCreate(
        { formData: data },
        {
          onSuccess: (res) => {
            notify(res);
            push(url);
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
      naviagteLink={url}
      dividerRemove={true}
    >
      {/* <Typography mb={3} variant="h4">
        {title}
      </Typography>
      <Paper component={'form'} onSubmit={handleSubmit(handleFormSumbit)} variant="form">
        <Stack direction={'column'} gap={2}>
          <Typography color={({ palette }) => palette.error.main} variant="body1">
            * Required
          </Typography> */}
      <SupplierRequiredFields control={control} />
      {/* <LoadingButton loading={createLoading || editPending} sx={{ width: 79 }} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Stack>
      </Paper> */}
    </FormLayout>
  );
};

export default SupplierForm;
