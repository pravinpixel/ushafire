/* eslint-disable max-lines */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { loanFormSchema } from 'helper/ValidationSchema';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { LoansTypeForm } from 'helper/types/sales-crm-system/LoansTypes';

import { useLoansEdit, useLoansCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import LoanDetails from './LoanDetails';
import { LoanGroupTable } from '../../_utils';

type Props = FormCompoundProps<LoansTypeForm>;

const FIELDNAME = 'loanItems';
const LoansForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();

  const form = useForm<LoansTypeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(loanFormSchema) as unknown as Resolver<LoansTypeForm>,
    mode: 'onSubmit',
  });
  const approvePage = defaultValue?.approvePage;
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync: LoansCreate } = useLoansCreate();
  const { mutateAsync: LoansEdit } = useLoansEdit();

  const handleFormSumbit: SubmitHandler<LoansTypeForm> = async (data) => {
    const formData: LoansTypeForm = {
      ...data,
      loanItems: data.loanItems?.map((value) => {
        return {
          ...value,
          stockStatus: (value?.availableQuantity as never) >= (value?.quantity as never) ? 'In Stock' : 'Out of Stock',
        };
      }),
    };
    if (data._id) {
      await LoansEdit(
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
      await LoansCreate(
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
      <LoanDetails />
      <LoanGroupTable FIELDNAME={FIELDNAME} />
    </FormLayout>
  );
};

export default LoansForm;
