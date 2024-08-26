import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { salesInvoiceSchema } from 'helper/ValidationSchema';
import { SalesInvoiceFormType } from 'helper/types/sales-crm-system/SalesInvoiceTypes';

import { useSalesInvoiceEdit, useSalesInvoiceCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import SalesInvoiceDetails from './SalesInvoiceDetails';
// import SalesInvoiceItemDetails from './SalesInvoiceItemDetails';
import QuotationItems from '../../quotation/_utils/QuotationItems';

type Props = FormCompoundProps<SalesInvoiceFormType>;

const SalesInvoiceForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();
  const form = useForm<SalesInvoiceFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(salesInvoiceSchema) as unknown as Resolver<SalesInvoiceFormType>,
    mode: 'onSubmit',
  });

  const approvePage = defaultValue?.approvePage;
  const {
    setError,
    formState: { isSubmitting },
    handleSubmit,
    // watch,
  } = form;
  const {
    mutateAsync: SalesInvoiceCreate,
    //  isPending: createLoading
  } = useSalesInvoiceCreate();
  const {
    mutateAsync: SalesInvoiceEdit,
    // isPending: editLoading
  } = useSalesInvoiceEdit();

  const handleFormSumbit: SubmitHandler<SalesInvoiceFormType> = async (data) => {
    if (data._id) {
      await SalesInvoiceEdit(
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
      await SalesInvoiceCreate(
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
      buttonLabel={approvePage ? 'Approve' : 'Send For Approval'}
      onSumbit={handleSubmit(async (data, event) => {
        await handleFormSumbit({ ...data, status: approvePage ? 'Approved' : 'Waiting for Approval' }, event);
      })}
      addMoreButton={
        approvePage
          ? [
              {
                label: 'Deny',
                onClick: handleSubmit(async (data, event) => {
                  await handleFormSumbit({ ...data, status: 'Denied' }, event);
                }),
                variant: 'outlined',
                loading: isSubmitting,
              },
            ]
          : [
              // {
              //   label: 'Save us Draft',
              //   onClick: async () => {
              //     await handleFormSumbit({ ...watch(), status: 'Draft' });
              //   },
              //   variant: 'outlined',
              //   loading: createLoading || editLoading,
              // },
              {
                label: 'Cancel Invoice',
                access: !!defaultValue?._id,
                onClick: handleSubmit(async (data, event) => {
                  await handleFormSumbit({ ...data, status: 'Invoice Cancelled' }, event);
                }),
                variant: 'outlined',
                loading: isSubmitting,
              },
            ]
      }
    >
      <SalesInvoiceDetails />
      <QuotationItems name="salesInvoiceItems" />
      {/* <SalesInvoiceItemDetails /> */}
    </FormLayout>
  );
};

export default SalesInvoiceForm;
