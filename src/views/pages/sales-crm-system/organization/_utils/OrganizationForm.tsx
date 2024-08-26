import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { organizationFormSchema } from 'helper/ValidationSchema';
import { OrganizationFormType } from 'helper/types/sales-crm-system/OrganizationTypes';

import { useOrganizationEdit, useOrganizationCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import OrganizationDetailForm from './OrganizationDetailForm';

type Props = FormCompoundProps<OrganizationFormType>;

const OrganizationForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();
  const form = useForm<OrganizationFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(organizationFormSchema) as unknown as Resolver<OrganizationFormType>,
    mode: 'onSubmit',
  });

  const { setError, handleSubmit } = form;
  const { mutateAsync: OrganizationCreate } = useOrganizationCreate();
  const { mutateAsync: OrganizationEdit } = useOrganizationEdit();

  const handleFormSumbit: SubmitHandler<OrganizationFormType> = async (data) => {
    if (data._id) {
      await OrganizationEdit(
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
      await OrganizationCreate(
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
      naviagteLink={navigateLink}
      onSumbit={handleSubmit(handleFormSumbit)}
    >
      <OrganizationDetailForm />
    </FormLayout>
  );
};

export default OrganizationForm;
