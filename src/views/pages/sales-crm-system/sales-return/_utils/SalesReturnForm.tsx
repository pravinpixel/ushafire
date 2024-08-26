import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { salesReturnFormSchema } from 'helper/ValidationSchema';
import { SalesReturnFormType } from 'helper/types/sales-crm-system/SalesReturnTypes';
import { SalesInvoiceFormType } from 'helper/types/sales-crm-system/SalesInvoiceTypes';

import { useSalesReturnEdit, useSalesReturnCreate } from 'store/hooks/SalesCrmSystemHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import SalesReturnDetails from './SalesReturnDetails';
import SalesReturnItemsTable from './SalesReturnItemsTable';

type Props = FormCompoundProps<SalesReturnFormType>;
const SalesInvoiceForm = ({ title, navigateLink, defaultValue }: Props) => {
    const router = useRouter();
    const form = useForm<SalesReturnFormType>({
        defaultValues: defaultValue,
        resolver: yupResolver(salesReturnFormSchema) as unknown as Resolver<SalesReturnFormType>,
        mode: 'onSubmit',
    });
    const {
        setError,
        formState: { isSubmitting },
        handleSubmit,
    } = form;
    const { mutateAsync: SalesReturnCreate } = useSalesReturnCreate();
    const { mutateAsync: SalesReturnEdit } = useSalesReturnEdit();

    const handleFormSumbit: SubmitHandler<SalesInvoiceFormType> = async (data) => {
        if (data._id) {
            await SalesReturnEdit(
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
            await SalesReturnCreate(
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
            onSumbit={handleSubmit(handleFormSumbit)}>
            <SalesReturnDetails />
            <SalesReturnItemsTable />
        </FormLayout>
    );
};

export default SalesInvoiceForm;
