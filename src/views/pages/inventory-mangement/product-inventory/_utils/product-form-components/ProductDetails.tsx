import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { staticOptions, PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

import InputField from 'views/components/form-components/InputField';
import CheckBoxField from 'views/components/form-components/CheckBoxField';
import TextAreaField from 'views/components/form-components/TextAreaField';
import DimensionField from 'views/components/form-components/DimenssionField';
import InputSelectField from 'views/components/form-components/InputSelectField';
import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';
import AutoGenerateSkuField from 'views/components/form-components/AutoGenerateSkuField';
import DragAndDropImageField from 'views/components/form-components/DragAndDropImageField';

type Props = {
  options?: EssentialDataType;
};

const ProductDetails = ({ options }: Props) => {
  const { control } = useFormContext<ProductFormType>();
  return (
    <>
      <Grid item xs={12} md={12} pt={0}>
        <Typography variant="h6">Product Details</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <InputField
          name={'productName'}
          control={control}
          label="Product Name"
          fieldProps={{
            placeholder: 'Enter Product Name',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <InputField
          name={'productCode'}
          control={control}
          label="Product Code"
          fieldProps={{
            placeholder: 'Enter Product Code',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <DragAndDropImageField
          name={'productImages'}
          deleteName={`productImages${PROJECT_CONSTANTS.DeleteKey}`}
          control={control}
          label="Product Image"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AutoGenerateSkuField
          name={'SKU'}
          control={control}
          vision="Product"
          label="Product SKU"
          fieldProps={{
            placeholder: 'Enter Product SKU',
          }}
          checkBoxProps={{
            label: 'Auto Generate SKU',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextAreaField
          name={'description'}
          control={control}
          label="Product Description"
          fieldProps={{
            placeholder: 'Describe  the product',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'productType'}
          control={control}
          label="Product Type"
          options={options?.ProductType}
          addName={'ProductType'}
          textFieldProps={{
            placeholder: 'Select Product Type',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'UOM'}
          control={control}
          label="Unit of Measure"
          options={options?.Uom}
          addName="Uom"
          textFieldProps={{
            placeholder: 'Enter Unit of Measure',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <InputField
          name={'newItemNumber'}
          control={control}
          label="New Item Number"
          fieldProps={{
            placeholder: 'New Item Number',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <InputField
          name={'oldItemNumber'}
          control={control}
          label="Old Item Number"
          fieldProps={{
            placeholder: 'Enter Old Item Number',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <InputField
          name={'alternativeItemNumber'}
          control={control}
          label="Alternative Item Number"
          fieldProps={{
            placeholder: 'Enter Alternative Item Number',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <InputField
          name={'DuplicateItemCode'}
          control={control}
          label="Duplicate Item Code"
          fieldProps={{
            placeholder: 'Enter Duplicate Item Code',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'type'}
          control={control}
          label="Select Type"
          options={options?.Type}
          addName="Type"
          textFieldProps={{
            placeholder: 'Select Type',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DimensionField dimension={['L', 'B', 'H']} name={'dimension'} control={control} label="Product Dimension " />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <InputSelectField
          name={'weight'}
          codeName="unit"
          control={control}
          label="Product Weight"
          fieldProps={{
            placeholder: 'Enter Weight',
          }}
          position="endAdornment"
          options={staticOptions.weightOption}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'itemCategoryCode'}
          control={control}
          label="Item Category Code"
          options={options?.Category}
          addName="Category"
          textFieldProps={{
            placeholder: 'Enter Item Category Code',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'productGroupCode'}
          control={control}
          label="Product Group Code"
          options={options?.ProductGroup}
          addName="ProductGroup"
          textFieldProps={{
            placeholder: 'Enter Product Group Code',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <NumberInputField
          name={'fixedCommissionPercentage'}
          control={control}
          label="Fixed Commission Percentage"
          fieldProps={{
            placeholder: 'Enter Fixed Commission Percentage',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'brand'}
          control={control}
          label="Brand"
          options={options?.Brand}
          addName="Brand"
          textFieldProps={{
            placeholder: 'Select Brand',
          }}
        />
      </Grid>
      <Grid item>
        <CheckBoxField
          name={'inventoryValueZero'}
          control={control}
          labelProps={{
            label: 'Inventory Value Zero',
          }}
        />
      </Grid>

      <Grid item>
        <CheckBoxField
          name={'Blocked'}
          control={control}
          labelProps={{
            label: 'Blocked',
          }}
        />
      </Grid>
      <Grid item>
        <CheckBoxField
          name={'SkipApproval'}
          control={control}
          labelProps={{
            label: 'Skip Approval',
          }}
        />
      </Grid>
      <Grid item>
        <CheckBoxField
          name={'dontShowCommissionReport'}
          control={control}
          labelProps={{
            label: 'Dont Show Commission Report',
          }}
        />
      </Grid>
    </>
  );
};

export default ProductDetails;
