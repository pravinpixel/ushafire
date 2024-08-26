import { useFormContext } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import { IconWrapper } from 'theme/svg';

import { PROJECT_CONSTANTS } from 'helper/GlobalHelper';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

import AsyncSelectField from 'views/components/form-components/AsyncSelectField';
import NumberInputField from 'views/components/form-components/NumberInputField';

type Props = {
  options?: EssentialDataType;
};

const ConfigureProductPrice = ({ options }: Props) => {
  const { control } = useFormContext<ProductFormType>();
  const priceComponents = <IconWrapper paddingRight={'5px'}>{PROJECT_CONSTANTS.DOLLER}</IconWrapper>;

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Configure Product Stock & Price</Typography>
      </Grid>
      {/*<======================== As now this is hidden ========================>*/}
      {/* <Grid item xs={12} sm={6} md={6}>
        <NumberInputField
          name={'quantityInStock'}
          control={control}
          label="Quantity in Stock"
          fieldProps={{
            placeholder: 'Enter Quantity in Stock',
          }}
        />
      </Grid> */}
      {/* <Grid item xs={12} sm={6} md={6} /> */}
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'productStatus'}
          control={control}
          label="Product Status"
          options={options?.['Product-status']}
          addName={'Product-status'}
          fieldProps={{
            clearIcon: false,
            disableClearable: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} />
      <Grid item xs={12} sm={6} md={6}>
        <AsyncSelectField
          name={'salesUOM'}
          control={control}
          label="Sales Unit of Measure"
          textFieldProps={{
            placeholder: 'Select Sales Unit of Measure',
          }}
          addName="Uom"
          options={options?.Uom}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} />
      <Grid item xs={12} sm={6} md={6}>
        <NumberInputField
          name={'costPrice'}
          control={control}
          label="Cost Price"
          fieldProps={{
            placeholder: 'Enter Cost Price',
            InputProps: {
              startAdornment: priceComponents,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} />
      <Grid item xs={12} sm={6} md={6}>
        <NumberInputField
          name={'sellingPrice'}
          control={control}
          label="Selling Price"
          fieldProps={{
            placeholder: 'Enter Selling Price',
            InputProps: {
              startAdornment: priceComponents,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} />
      <Grid item xs={12} sm={6} md={6}>
        <NumberInputField
          name={'sellingPriceAfterDiscount'}
          control={control}
          label="Selling Price After Discount"
          fieldProps={{
            placeholder: 'Enter Selling Price After Discount',
            InputProps: {
              startAdornment: priceComponents,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} />
      <Grid item xs={12} sm={6} md={6}>
        <NumberInputField
          name={'taxPercentage'}
          control={control}
          label="Tax Percentage"
          fieldProps={{
            placeholder: 'Enter Tax Percentage',
            InputProps: {
              startAdornment: priceComponents,
            },
          }}
        />
      </Grid>
    </>
  );
};

export default ConfigureProductPrice;
