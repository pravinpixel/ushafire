/**
 * This file is part of AutoPack.
 *
 * Stock Inward Form to insert the stock to the ware house
 */

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import * as Helper from 'helper/GlobalHelper';
import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { adminFormConfigurationSchema } from 'helper/ValidationSchema';
import { ConfigurationFormType } from 'helper/types/AdminSettingTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useConfigurationEdit, useConfigurationCreate } from 'store/hooks/SettingHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import RadioGroupField from 'views/components/form-components/RadioGroupField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import ActInactSwitchField from 'views/components/form-components/ActInactField';

type Props = FormCompoundProps<ConfigurationFormType>;

const EssentialNeed: EssentialType[] = ['Configuration'];

const ConfigurationForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<ConfigurationFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(adminFormConfigurationSchema) as unknown as Resolver<ConfigurationFormType>,
    mode: 'onSubmit',
  });
  const { control, setError, handleSubmit } = form;

  const { data: options, isLoading } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const { mutateAsync: ConfigurationCreate } = useConfigurationCreate();
  const { mutateAsync: ConfigurationEdit } = useConfigurationEdit();

  const handleFormSumbit: SubmitHandler<ConfigurationFormType> = async (formData) => {
    if (formData._id) {
      await ConfigurationEdit(
        { formData },
        {
          onSuccess: (res) => {
            notify(res);
            router.push(navigateLink ?? '/');
          },
          onError: (error) => {
            errorSet({ error, setError });
          },
        }
      );
    } else {
      await ConfigurationCreate(
        { formData },
        {
          onSuccess: (res) => {
            notify(res);
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
    <FormLayout
      formProps={form}
      title={title}
      dividerRemove={false}
      onSumbit={handleSubmit(handleFormSumbit)}
      naviagteLink={navigateLink}
      gridProps={{
        md: 1,
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Unique Serial Number Configuration Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="type_id"
          control={control as never}
          label="Type"
          textFieldProps={{
            placeholder: 'Select Type',
            required: true,
          }}
          loading={isLoading}
          options={options?.Configuration}
          addName={'Configuration'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="text"
          control={control as never}
          label="Prefix Text"
          fieldProps={{
            placeholder: 'Enter Prefix Text',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RadioGroupField
          control={control as never}
          name="image_storage"
          label="Choose Image Storage"
          options={Helper.ConfigurationOptions}
          required
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <ActInactSwitchField name="status" control={control as never} labelProps={{ label: 'Status', required: true }} />
      </Grid>
    </FormLayout>
  );
};

export default ConfigurationForm;
