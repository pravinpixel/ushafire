import { useFormContext } from 'react-hook-form';

import { Grid, Collapse, Typography } from '@mui/material';

import { supplierFormSchema, masterFormTypeOneSchema } from 'helper/ValidationSchema';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

import { useMasterCreate } from 'store/hooks/MasterHooks';
import { useSupplierCreate } from 'store/hooks/SupplierHooks';

import InputField from 'views/components/form-components/InputField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import AddAsyncSelectField from 'views/components/form-components/AddAsyncSelectField';

type Props = {
  options?: EssentialDataType;
};
const ProductInventoryDetails = ({ options }: Props) => {
  const { control, watch, setValue } = useFormContext<ProductFormType>();
  const { mutateAsync: supplierCreate, isPending: supplierLoading } = useSupplierCreate();
  const { mutateAsync: MasterCreate, isPending: createPending } = useMasterCreate();

  const loading = createPending || supplierLoading;
  const sx = {
    md: 12,
    sm: 12,
    xs: 12,
  };

  const productCategory = watch('productCategory');

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Inventory</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name={'shelfNumber'}
          control={control}
          label="Shelf Number"
          options={options?.Shelf}
          addName="Shelf"
          textFieldProps={{
            placeholder: 'Select Shelf Number',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name={'QuantityOnSalesOrder'}
          control={control}
          label="Quantity on Sales Order"
          fieldProps={{
            placeholder: 'Enter Quantity on Sales Order',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name={'inventory'}
          control={control}
          label="Inventory"
          fieldProps={{
            placeholder: 'Enter Inventory',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name={'stockoutWarning'}
          control={control}
          label="Stockout Warning"
          options={options?.['Yes-no']}
          // textFieldProps={{
          //   placeholder: 'Enter Stockout Warning',
          // }}
          fieldProps={{
            clearIcon: false,
            disableClearable: true,
          }}
          addName={'Yes-no'}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name={'unitVolume'}
          control={control}
          label="Unit Volume"
          fieldProps={{
            placeholder: 'Enter Unit Volume',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name={'quantityOnPunchOrder'}
          control={control}
          label="Quantity on Punch Order"
          fieldProps={{
            placeholder: 'Enter Quantity on Punch Order',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInputField
          name={'minimumOrderQuantity'}
          control={control}
          label="Minimum Order Quantity"
          fieldProps={{
            placeholder: 'Enter Minimum Order Quantity',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name={'hsnCode'}
          control={control}
          label="HSN Code"
          fieldProps={{
            placeholder: 'Enter HSN Code',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputField
          name={'manufacturer'}
          control={control}
          label="Manufacturer"
          fieldProps={{
            placeholder: 'Enter Manufacturer',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AsyncSelectField
          name={'relatedProducts'}
          control={control}
          label="Related Products"
          options={options?.Product}
          addName="Product"
          fieldProps={{
            multiple: true,
          }}
          textFieldProps={{
            placeholder: 'Select Related Product',
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <AddAsyncSelectField
          name={'supplier'}
          control={control}
          label="Supplier"
          options={options}
          addName="Supplier"
          textFieldProps={{
            placeholder: 'Select Supplier',
          }}
          schema={supplierFormSchema as never}
          loading={loading}
          fend_component={'supplier'}
          mutateAsync={supplierCreate}
          formDetails={{}}
          inputOptions={{
            label: 'Select Supplier',
            options,
            isLoading: loading,
            sx: sx,
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <AddAsyncSelectField
          name={'productCategory'}
          control={control}
          label="Product Category"
          options={options}
          schema={masterFormTypeOneSchema('Product Category') as never}
          addName="Category-Subcategory"
          textFieldProps={{
            placeholder: 'Select Product Category',
            onChange: () => setValue('productSubCategory', null),
          }}
          loading={loading}
          fend_component={'category'}
          mutateAsync={MasterCreate}
          formDetails={{
            url: '/category',
            method: 'post',
          }}
          inputOptions={{
            label: 'Product Category',
            options,
            isLoading: loading,
            sx: sx,
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Collapse in={!!productCategory}>
          <AddAsyncSelectField
            name={'productSubCategory'}
            control={control}
            schema={masterFormTypeOneSchema('Product Sub Category') as never}
            label="Product Sub Category"
            options={
              {
                SubCategory: options?.SubCategory.filter((option) => option.parentId === (productCategory?.value as string)),
              } as EssentialDataType
            }
            addName="SubCategory"
            key={productCategory?.value as string}
            textFieldProps={{
              placeholder: 'Select Product Sub Category',
            }}
            loading={loading}
            fend_component={'category'}
            mutateAsync={MasterCreate}
            searchFilters={{
              key: 'categoryId',
              value: productCategory?.value as string,
            }}
            formDetails={{
              url: '/sub-category',
              method: 'post',
            }}
            inputOptions={{
              label: 'Product Sub Category',
              options,
              isLoading: loading,
              sx: sx,
              defaultValues: {
                categoryId: productCategory,
              },
              includeArray: ['categoryId'],
            }}
          />
        </Collapse>
      </Grid>
    </>
  );
};

export default ProductInventoryDetails;
