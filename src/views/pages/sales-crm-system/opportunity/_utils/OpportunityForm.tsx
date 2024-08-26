import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { opportunityFormSchema } from 'helper/ValidationSchema';
import { OpportunityFormType } from 'helper/types/sales-crm-system/OpportunityTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useOpportunityEdit, useOpportunityCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import DatePickerField from 'views/components/form-components/DatePickerField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

import CrmProductGroup from '../../_utils/CrmProductGroup';

type Props = FormCompoundProps<OpportunityFormType>;

const EssentialNeed: EssentialType[] = ['Customer', 'User', 'Opportunity-opportunity-type', 'Lead-lead-type'];
const OpportunityForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();
  const form = useForm<OpportunityFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(opportunityFormSchema) as unknown as Resolver<OpportunityFormType>,
    mode: 'onSubmit',
  });

  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const {
    control,
    setError,
    formState: { isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = form;
  const { mutateAsync: OpportunityCreate } = useOpportunityCreate();
  const { mutateAsync: OpportunityEdit } = useOpportunityEdit();

  const handleFormSumbit: SubmitHandler<OpportunityFormType> = async (data) => {
    if (data._id) {
      await OpportunityEdit(
        { formData: data, id: data._id },
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
      await OpportunityCreate(
        { formData: data },
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
      formProps={{
        ...form,
      }}
      buttonLabel="Approval"
      title={title}
      dividerRemove={false}
      loading={isSubmitting}
      naviagteLink={navigateLink}
      onSumbit={handleSubmit(handleFormSumbit)}
      addMoreButton={[
        {
          label: 'Save as Draft',
          variant: 'outlined',
          sx: {
            width: 'max-content',
          },
          loading: !!watch('draft'),
          onClick: () => {
            setValue('draft', true);
            handleFormSumbit(watch());
          },
          type: 'button',
        },
      ]}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Opportunity</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="opportunityNumber"
          control={control}
          label="Opportunity Number"
          fieldProps={{
            placeholder: 'Enter Opportunity Number',
            required: true,
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="opportunityDate"
          control={control}
          label="Opportunity date"
          fieldProps={{
            placeholder: 'Enter Opportunity date',
            required: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name="leadNumber"
          control={control}
          label="Lead Number"
          fieldProps={{
            placeholder: 'Enter Lead Number',
            required: true,
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerField
          name="leadDate"
          control={control}
          label="Lead date"
          fieldProps={{
            placeholder: 'Enter Lead date',
            required: true,
          }}
          pickerProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="leadType"
          control={control}
          label="Lead Type"
          options={options?.['Lead-lead-type']}
          fieldProps={{
            readOnly: true,
          }}
          textFieldProps={{
            placeholder: 'Select Lead Type',
            required: true,
          }}
          addName={'Lead-lead-type'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="customerId"
          control={control}
          label="Customer"
          options={options?.Customer}
          fieldProps={{
            readOnly: true,
          }}
          textFieldProps={{
            placeholder: 'Select Customer',
            required: true,
          }}
          addName={'Customer'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="salePersonId"
          control={control}
          label="Sale Person"
          options={options?.User}
          fieldProps={{
            readOnly: true,
          }}
          textFieldProps={{
            placeholder: 'Select Sale Person',
            required: true,
          }}
          addName={'User'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name="opportunityType"
          control={control}
          label="Opportunity Type"
          options={options?.['Opportunity-opportunity-type']}
          textFieldProps={{
            placeholder: 'Select Opportunity Type',
            required: true,
          }}
          addName={'Opportunity-opportunity-type'}
        />
      </Grid>
      <CrmProductGroup fieldName={'opportunityItems'} />
    </FormLayout>
  );
};

export default OpportunityForm;
