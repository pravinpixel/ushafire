import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { blanketOrderSchema } from 'helper/ValidationSchema';
import { BlanketOrderFormType } from 'helper/types/sales-crm-system/BlanketOrderTypes';

import { useBlanketOrderEdit, useBlanketOrderCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import BlanketDetailForm from './BlanketDetailForm';
import { BlanketOrderGroupTable } from '../../_utils';

type Props = FormCompoundProps<BlanketOrderFormType>;
const FIELDNAME = 'blanketOrderItems';

const BlanketOrderForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();
  const form = useForm<BlanketOrderFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(blanketOrderSchema) as unknown as Resolver<BlanketOrderFormType>,
    mode: 'onSubmit',
  });
  const approvePage = defaultValue?.approvePage;
  const {
    setError,
    watch,
    formState: { isSubmitting },
    handleSubmit,
  } = form;
  const { mutateAsync: BlanketOrderCreate } = useBlanketOrderCreate();
  const { mutateAsync: BlanketOrderEdit, isPending } = useBlanketOrderEdit();

  const handleFormSumbit: SubmitHandler<BlanketOrderFormType> = async (data) => {
    const formData: BlanketOrderFormType = {
      ...data,
      blanketOrderItems: data.blanketOrderItems?.map((value) => {
        return {
          ...value,
          stockStatus: (value?.availableQuantity as never) >= (value?.quantity as never) ? 'In Stock' : 'Out of Stock',
        };
      }),
    };
    if (data._id) {
      await BlanketOrderEdit(
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
      await BlanketOrderCreate(
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
      gridProps={
        {
          // md: 4,
        }
      }
    >
      <BlanketDetailForm />
      <BlanketOrderGroupTable FIELDNAME={FIELDNAME} />
    </FormLayout>
  );
};

export default BlanketOrderForm;
