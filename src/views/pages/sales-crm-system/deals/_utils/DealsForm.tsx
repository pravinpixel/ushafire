import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { leadFormSchema } from 'helper/ValidationSchema';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { DealsFormType } from 'helper/types/sales-crm-system/DealsTypes';

import { useDealsEdit, useDealsCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

type Props = FormCompoundProps<DealsFormType>;

const DealsForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();
  const form = useForm<DealsFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(leadFormSchema) as unknown as Resolver<DealsFormType>,
    mode: 'onSubmit',
  });
  const {
    setError,
    formState: { isSubmitting },
    handleSubmit,
  } = form;
  const { mutateAsync: DealsCreate } = useDealsCreate();
  const { mutateAsync: DealsEdit } = useDealsEdit();

  const handleFormSumbit: SubmitHandler<DealsFormType> = async (data) => {
    if (data._id) {
      await DealsEdit(
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
      await DealsCreate(
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
      gridProps={
        {
          // md: 4,
        }
      }
    >
      Demo
    </FormLayout>
  );
};

export default DealsForm;
