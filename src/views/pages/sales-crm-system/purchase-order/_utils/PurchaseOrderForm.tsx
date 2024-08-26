import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { purchaseorderFormSchema } from 'helper/ValidationSchema';
import { PurchaseOrderTypeForm } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import { usePurchaseOrderEdit, usePurchaseOrderCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import PurchaseOrderDetail from './PurchaseOrderDetail';

type Props = FormCompoundProps<PurchaseOrderTypeForm> & {
  formTitle?: string;
};

const PurchaseOrderForm = ({ defaultValue, title, navigateLink, formTitle }: Props) => {
  const router = useRouter();
  const form = useForm<PurchaseOrderTypeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(purchaseorderFormSchema) as unknown as Resolver<PurchaseOrderTypeForm>,
    mode: 'onSubmit',
  });
  const approvePage = defaultValue?.approvePage;
  const {
    setError,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync: PurchaseOrderCreate, isPending: createLoading } = usePurchaseOrderCreate();
  const { mutateAsync: PurchaseOrderEdit, isPending: editLoading } = usePurchaseOrderEdit();

  const handleFormSumbit: SubmitHandler<PurchaseOrderTypeForm> = async (data) => {
    if (data._id) {
      await PurchaseOrderEdit(
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
      await PurchaseOrderCreate(
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
      formTitle={formTitle}
      title={title}
      buttonLabel={approvePage ? 'Approve' : 'Send For Approval'}
      dividerRemove={false}
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
              {
                label: 'Save us Draft',
                onClick: async () => {
                  await handleFormSumbit({ ...watch(), status: 'Draft' });
                },
                variant: 'outlined',
                loading: createLoading || editLoading,
              },
              {
                label: 'Cancel PO',
                access: !!defaultValue?._id,
                onClick: handleSubmit(async (data, event) => {
                  await handleFormSumbit({ ...data, status: 'PO Cancelled' }, event);
                }),
                variant: 'outlined',
                loading: isSubmitting,
              },
            ]
      }
      loading={isSubmitting}
      naviagteLink={navigateLink}
    >
      <PurchaseOrderDetail formTitle={formTitle} />
    </FormLayout>
  );
};

export default PurchaseOrderForm;
