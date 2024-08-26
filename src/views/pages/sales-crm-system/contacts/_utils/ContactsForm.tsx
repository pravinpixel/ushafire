import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { contactFormSchema } from 'helper/ValidationSchema';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { ContactsTypeForm } from 'helper/types/sales-crm-system/ContactsTypes';

import { useContactEdit, useContactCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import ContactDetailForm from './ContactDetailForm';

type Props = FormCompoundProps<ContactsTypeForm>;

const ContactsForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<ContactsTypeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(contactFormSchema) as unknown as Resolver<ContactsTypeForm>,
    mode: 'onSubmit',
  });

  const { setError, handleSubmit } = form;
  const { mutateAsync: ContactCreate } = useContactCreate();
  const { mutateAsync: ContactEdit } = useContactEdit();

  const handleFormSumbit: SubmitHandler<ContactsTypeForm> = async (data) => {
    if (data._id) {
      await ContactEdit(
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
      await ContactCreate(
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
      onSumbit={handleSubmit(handleFormSumbit)}
      naviagteLink={navigateLink}
      mainGridProps={{
        alignItems: 'normal',
      }}
    >
      <ContactDetailForm />
    </FormLayout>
  );
};

export default ContactsForm;
