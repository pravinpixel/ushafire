import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { productFormSchema } from 'helper/ValidationSchema';
import { FormCompoundProps } from 'helper/types/GlobalTypes';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useProductEdit, useProductCreate } from 'store/hooks/InventoryManagementHook';

import FormLayout from 'views/components/ui-componet/FormLayout';

import { ProductDetails, ProductTitleUrl, ConfigureProductPrice, ProductInventoryDetails } from './product-form-components';

type Props = FormCompoundProps<ProductFormType>;

const EssentialNeed: EssentialType[] = [
  'Uom',
  'Product',
  'Category-Subcategory',
  'Category',
  'SubCategory',
  'Supplier',
  'Bay',
  'Brand',
  'BusinessVertical',
  'ProductType',
  'Type',
  'PaymentTerms',
  'Shelf',
  'ProductGroup',
  'Product-status',
  'Yes-no',
  'Product-weight',
];

const ProductForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<ProductFormType>({
    defaultValues: defaultValue,
    resolver: yupResolver(productFormSchema) as unknown as Resolver<ProductFormType>,
    mode: 'onSubmit',
  });
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const { data } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const { mutateAsync: ProductCreate } = useProductCreate();
  const { mutateAsync: ProductEdit } = useProductEdit();

  const handleFormSumbit: SubmitHandler<ProductFormType> = async (data) => {
    if (data._id) {
      await ProductEdit(
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
      await ProductCreate(
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
      // buttonLabel={title}
      loading={isSubmitting}
      onSumbit={handleSubmit(handleFormSumbit)}
      requiredRemove
      naviagteLink={navigateLink}
      dividerRemove={true}
    >
      <ProductDetails options={data} />
      <ProductInventoryDetails options={data} />
      <ConfigureProductPrice options={data} />
      <ProductTitleUrl />
    </FormLayout>
  );
};

export default ProductForm;
