import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { notify, errorSet } from 'helper/GlobalHelper';
import { barcodeFormSchema } from 'helper/ValidationSchema';
import { OptionsType, FormCompoundProps } from 'helper/types/GlobalTypes';
import { BarcodeTypeForm } from 'helper/types/inventory-management/BarcodeType';

import { useEssentialList } from 'store/hooks/EssentialHooks';
import { useBarcodeEdit, useBarcodeCreate } from 'store/hooks/InventoryManagementHook';

import FormLayout from 'views/components/ui-componet/FormLayout';
import InputField from 'views/components/form-components/InputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

type Props = FormCompoundProps<BarcodeTypeForm>;

const EssentialNeed: EssentialType[] = ['Product'];

const BarcodeForm = ({ defaultValue, title, navigateLink }: Props) => {
  const router = useRouter();
  const form = useForm<BarcodeTypeForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(barcodeFormSchema) as unknown as Resolver<BarcodeTypeForm>,
    mode: 'onSubmit',
  });
  const { control, setError, handleSubmit, setValue } = form;
  const { data: options } = useEssentialList({
    params: {
      include: EssentialNeed,
    },
  });
  const { mutateAsync: barcodeCreate } = useBarcodeCreate();
  const { mutateAsync: barcodeEdit } = useBarcodeEdit();

  const handleFormSumbit: SubmitHandler<BarcodeTypeForm> = (data) => {
    if (data._id) {
      barcodeEdit(
        {
          formData: data,
          id: data._id,
        },
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
      barcodeCreate(
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
  const handleProductChange = (productId: OptionsType) => {
    setValue('productName', (productId?.label ?? '') as never, { shouldValidate: true });
    setValue('productCode', (productId?.productCode ?? '', { shouldValidate: true }) as never);
    setValue('sku', (productId?.SKU ?? '') as never, { shouldValidate: true });
    setValue('categoryId', (productId?.productCategory ? { ...productId.productCategory } : '') as never, { shouldValidate: true });
    setValue('subcategoryId', (productId?.productSubCategory ? { ...productId.productSubCategory } : '') as never, { shouldValidate: true });
  };
  return (
    <FormLayout
      formProps={{
        ...form,
      }}
      title={title}
      onSumbit={handleSubmit(handleFormSumbit)}
      requiredRemove
      naviagteLink={navigateLink}
      dividerRemove={false}
    >
      <Grid item xs={12} md={12} pb={2}>
        <Typography variant="h6">Barcode Details</Typography>
      </Grid>
      <Grid item md={6}>
        <AsyncSelectField
          name={'productId'}
          control={control}
          label="Product"
          options={options?.Product}
          onChange={handleProductChange}
          addName="Product"
          textFieldProps={{
            placeholder: 'Select Product',
          }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField
          name={'productName'}
          control={control}
          label="Product Name"
          fieldProps={{
            placeholder: 'Enter Product Name',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item md={6}>
        <AsyncSelectField
          name={'categoryId'}
          control={control}
          label="Category"
          addName="Category"
          textFieldProps={{
            placeholder: 'Select Category',
          }}
          fieldProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item md={6}>
        <AsyncSelectField
          name={'subcategoryId'}
          control={control}
          label="Sub Category"
          addName={'SubCategory'}
          textFieldProps={{
            placeholder: 'Select Sub Category',
          }}
          fieldProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField
          name={'productCode'}
          control={control}
          label="Product Code"
          fieldProps={{
            placeholder: 'Enter Product Code',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField
          name={'sku'}
          control={control}
          label="Product SKU"
          fieldProps={{
            placeholder: 'Enter Product SKU',
            InputProps: {
              readOnly: true,
            },
          }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField
          name={'barcode'}
          control={control}
          label="Product Barcode"
          fieldProps={{
            placeholder: 'Enter Product Barcode',
          }}
        />
      </Grid>
      <Grid item md={6}>
        <InputField
          name={'quantity'}
          control={control}
          label="No. of Quantity"
          fieldProps={{
            placeholder: 'Enter No. of Quantity',
          }}
        />
      </Grid>
    </FormLayout>
  );
};

export default BarcodeForm;
