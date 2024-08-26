import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { customerPaymentFormSchema } from 'helper/ValidationSchema';
import { CustomerPaymentType } from 'helper/types/manage-payments/CustomerPayments';

import { useCustomerPaymentEdit, useCustomerPaymentCreate } from 'store/hooks/ManagePaymentHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';

import CustomerPaymentDetail from './CustomerPaymentDetail';
import CustomerPaymentFormTable from './CustomerPaymentFormTable';

type Props = FormCompoundProps<CustomerPaymentType>;

const CustomerPaymentForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<CustomerPaymentType>({
    defaultValues: defaultValue,
    resolver: yupResolver(customerPaymentFormSchema) as unknown as Resolver<CustomerPaymentType>,
    mode: 'onSubmit',
  });
  const { setError, handleSubmit } = form;
  const { mutateAsync: vendorPaymentCreate } = useCustomerPaymentCreate();
  const { mutateAsync: vendorPaymentEdit } = useCustomerPaymentEdit();

  const handleFormSumbit: SubmitHandler<CustomerPaymentType> = async (data) => {
    if (data._id) {
      await vendorPaymentEdit(
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
      await vendorPaymentCreate(
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
      buttonLabel={'Submit'}
      dividerRemove={false}
      onSumbit={handleSubmit(handleFormSumbit)}
      naviagteLink={navigateLink}
    >
      <CustomerPaymentDetail />
      <CustomerPaymentFormTable />
    </FormLayout>
  );
};

export default CustomerPaymentForm;
