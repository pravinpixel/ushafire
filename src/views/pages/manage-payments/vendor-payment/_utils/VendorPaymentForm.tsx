import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { vendorPaymentFormSchema } from 'helper/ValidationSchema';
import { VendorPaymentType } from 'helper/types/manage-payments/VendorPayments';

import { useVendorPaymentEdit, useVendorPaymentCreate } from 'store/hooks/ManagePaymentHooks';

import FormLayout from 'views/components/ui-componet/FormLayout';

import VendorDetail from './VendorPaymentDetail';
import VendorPaymentFormTable from './VendorPaymentFormTable';

type Props = FormCompoundProps<VendorPaymentType>;

const VendorPaymentForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<VendorPaymentType>({
    defaultValues: defaultValue,
    resolver: yupResolver(vendorPaymentFormSchema) as unknown as Resolver<VendorPaymentType>,
    mode: 'onSubmit',
  });
  const { setError, handleSubmit } = form;

  const { mutateAsync: vendorPaymentCreate } = useVendorPaymentCreate();
  const { mutateAsync: vendorPaymentEdit } = useVendorPaymentEdit();

  const handleFormSumbit: SubmitHandler<VendorPaymentType> = async (data) => {
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
      <VendorDetail />
      <VendorPaymentFormTable />
    </FormLayout>
  );
};

export default VendorPaymentForm;
