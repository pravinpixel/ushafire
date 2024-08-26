import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { saleOrderFormSchema } from 'helper/ValidationSchema';
import { SaleOrderTypeForm } from 'helper/types/sales-crm-system/SalesOrderTypes';

import { useSalesOrderEdit, useSalesOrderCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import SaleDetails from './SaleDetails';
import { SaleOrderGroupTable } from '../../_utils';

type Props = FormCompoundProps<SaleOrderTypeForm>;

const SaleOrderForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();

  const form = useForm<SaleOrderTypeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(saleOrderFormSchema) as unknown as Resolver<SaleOrderTypeForm>,
    mode: 'onSubmit',
  });
  const approvePage = defaultValue?.approvePage;
  const {
    setError,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = form;
  const { mutateAsync: SaleOrderCreate } = useSalesOrderCreate();
  const { mutateAsync: SaleOrderEdit, isPending } = useSalesOrderEdit();

  const handleFormSumbit: SubmitHandler<SaleOrderTypeForm> = async (data) => {
    const formData: SaleOrderTypeForm = {
      ...data,
      saleOrderItems: data.saleOrderItems?.map((value) => {
        return {
          ...value,
          stockStatus: (value?.availableQuantity as never) >= (value?.quantity as never) ? 'In Stock' : 'Out of Stock',
        };
      }),
    };
    if (data._id) {
      await SaleOrderEdit(
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
      await SaleOrderCreate(
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

  return (
    <FormLayout
      formProps={{
        ...form,
      }}
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
                onClick: () => {
                  handleFormSumbit({ ...watch(), status: 'Save as Draft' });
                },
                variant: 'outlined',
                loading: isPending,
              },
              {
                label: 'Out of Stock',
                variant: 'outlined',
                sx: {
                  width: 'max-content',
                },
                loading: isSubmitting,
                onClick: handleSubmit(async (data, event) => {
                  await handleFormSumbit({ ...data, status: 'Processing' }, event);
                }),
                type: 'button',
              },
            ]
      }
      naviagteLink={navigateLink}
    >
      <SaleDetails />
      <SaleOrderGroupTable FIELDNAME={'saleOrderItems'} />
    </FormLayout>
  );
};

export default SaleOrderForm;
