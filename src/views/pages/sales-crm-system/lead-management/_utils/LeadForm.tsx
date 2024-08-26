import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { leadFormSchema } from 'helper/ValidationSchema';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { LeadFormType } from 'helper/types/sales-crm-system/LeadManagementTypes';

import { useLeadEdit, useLeadCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import LeadQualifiction from './LeadQualifiction';
import LeadManagementDetails from './LeadManagementDetails';

type Props = FormCompoundProps<LeadFormType>;
const LeadForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();
  const form = useForm<LeadFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(leadFormSchema) as unknown as Resolver<LeadFormType>,
    mode: 'onSubmit',
  });
  const {
    setError,
    formState: { isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = form;
  const { mutateAsync: LeadCreate } = useLeadCreate();
  const { mutateAsync: LeadEdit } = useLeadEdit();

  const handleFormSumbit: SubmitHandler<LeadFormType> = async (data) => {
    if (data._id) {
      await LeadEdit(
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
      await LeadCreate(
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
      <LeadManagementDetails />
      <LeadQualifiction />
    </FormLayout>
  );
};

export default LeadForm;
