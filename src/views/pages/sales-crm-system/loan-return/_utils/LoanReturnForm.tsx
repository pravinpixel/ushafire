import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { LoanReturnFormType } from 'helper/types/sales-crm-system/LoanReturnType';

import { useLoanReturnEdit, useLoanReturnCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import LoanReturnDetails from './LoanReturnDetails';
import LoanReturnItemsTable from './LoanReturnItemsTable';

type Props = FormCompoundProps<LoanReturnFormType>;
const SalesInvoiceForm = ({ title, navigateLink, defaultValue }: Props) => {
  const router = useRouter();
  const form = useForm<LoanReturnFormType>({
    defaultValues: defaultValue,
    // resolver: yupResolver(leadFormSchema) as unknown as Resolver<LoanReturnFormType>,
    mode: 'onSubmit',
  });
  const {
    setError,
    formState: { isSubmitting },
    handleSubmit,
  } = form;
  const { mutateAsync: LoanReturnCreate } = useLoanReturnCreate();
  const { mutateAsync: LoanReturnEdit } = useLoanReturnEdit();

  const handleFormSumbit: SubmitHandler<LoanReturnFormType> = async (data) => {
    if (data._id) {
      await LoanReturnEdit(
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
      await LoanReturnCreate(
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
    >
      <LoanReturnDetails />
      <LoanReturnItemsTable />
    </FormLayout>
  );
};

export default SalesInvoiceForm;
