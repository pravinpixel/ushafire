import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { quotationFormSchema } from 'helper/ValidationSchema';
import { QuotationFormType } from 'helper/types/sales-crm-system/QuotationTypes';

import { useQuotationEdit, useQuotationCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import QuotationItems from './QuotationItems';
import QuotationDetailsForm from './QuotationDetailsForm';

type Props = FormCompoundProps<QuotationFormType>;
const QuotationForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();

  const form = useForm<QuotationFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(quotationFormSchema) as unknown as Resolver<QuotationFormType>,
    mode: 'onSubmit',
  });
  const { setError, handleSubmit } = form;
  const { mutateAsync: QuotationCreate } = useQuotationCreate();
  const { mutateAsync: QuotationEdit } = useQuotationEdit();

  const handleFormSumbit: SubmitHandler<QuotationFormType> = async (data) => {
    const formData: QuotationFormType = {
      ...data,
      status: 'Quote Generated',
      quotationItems: data.quotationItems?.map((value) => {
        return {
          ...value,
          stockStatus: (value?.availableQuantity as never) >= (value?.quantity as never) ? 'In Stock' : 'Out of Stock',
        };
      }),
    };
    if (data._id) {
      await QuotationEdit(
        { formData, id: data._id },
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
      await QuotationCreate(
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
  // const handleOutStockSumbit: SubmitHandler<QuotationFormType> = async (data) => {
  //   if (data._id) {
  //     await QuotationEdit(
  //       { formData: { ...data, status: 'Processing' }, id: data._id },
  //       {
  //         onSuccess: (res) => {
  //           notify(res);
  //           router.push(navigateLink ?? '/');
  //         },
  //         onError: (error) => {
  //           errorSet({ error, setError });
  //         },
  //       }
  //     );
  //   } else {
  //     await QuotationCreate(
  //       { formData: { ...data, status: 'Processing' } },
  //       {
  //         onSuccess: (res) => {
  //           notify(res);
  //           router.push(navigateLink ?? '/');
  //         },
  //         onError: (error) => {
  //           errorSet({ error, setError });
  //         },
  //       }
  //     );
  //   }
  // };
  return (
    <FormLayout
      formProps={{
        ...form,
      }}
      title={title}
      dividerRemove={false}
      naviagteLink={navigateLink}
      buttonLabel="Generate Quote"
      onSumbit={handleSubmit(handleFormSumbit)}
      // addMoreButton={[
      //   {
      //     label: 'Out of Stock',
      //     variant: 'outlined',
      //     sx: {
      //       width: 'max-content',
      //     },
      //     loading: isSubmitting,
      //     onClick: handleSubmit(handleOutStockSumbit),
      //     type: 'button',
      //   },
      // ]}
    >
      <QuotationDetailsForm />
      <QuotationItems />
    </FormLayout>
  );
};

export default QuotationForm;
