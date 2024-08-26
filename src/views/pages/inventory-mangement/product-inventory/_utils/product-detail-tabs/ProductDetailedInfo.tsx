import { useContext } from 'react';

import { Box, Grid, Paper, Stack, Palette, Typography, PaletteColor } from '@mui/material';

import { customgreyProps } from 'theme/palette';

import { ProductViewContext } from './ProductViewContext';

// type Props = { handleChange: (_event: React.SyntheticEvent | null, newValue: unknown) => void };
type ProductPropertieDetails = { subtitle: string; value?: string | number | null };
type InventoryetailCardProps = {
  // children: ReactNode;
  title?: string | number;
  subTitle: string;
  onClick?: () => void;
  color?: keyof Palette;
  shade?: keyof PaletteColor | keyof customgreyProps;
};

const InventoryDetailCard = ({ color = 'primary', shade = 'main', title, subTitle, onClick }: InventoryetailCardProps) => {
  return (
    <Box
      onClick={onClick}
      sx={({ shadows, shape, palette }) => ({
        boxShadow: shadows[11],
        cursor: onClick && 'pointer',
        color: palette.customColor.lightPink,
        bgcolor: (palette?.[color] as never)?.[shade],
        borderRadius: shape,
        minHeight: '7.40375rem',
        width: '16.25rem',
        pl: 4,
        py: 2,
      })}
    >
      <Stack gap={1.5}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="caption">{subTitle}</Typography>
      </Stack>
    </Box>
  );
};
const ProductProperties = ({ subtitle, value }: ProductPropertieDetails) => {
  return (
    <Box px={1} py={0.5} minWidth={'9.7rem'} minHeight={'3rem'}>
      <Typography variant="subtitle2" color={({ palette }) => palette.grey[700]}>
        {subtitle}
      </Typography>
      <Typography variant="boldOne">{value}</Typography>
    </Box>
  );
};
const ProductDetailedInfo = () => {
  const { data, handleChange } = useContext(ProductViewContext);
  const productPropertieDetails: ProductPropertieDetails[] = [
    {
      subtitle: 'New Item Number',
      value: data?.newItemNumber,
    },
    {
      subtitle: 'Old Item Number',
      value: data?.oldItemNumber,
    },
    {
      subtitle: 'Alternative Item Number',
      value: data?.alternativeItemNumber,
    },
    {
      subtitle: 'Duplicate Item Code',
      value: data?.DuplicateItemCode,
    },
    {
      subtitle: 'Item Category Code',
      value: data?.itemCategoryCode?.label,
    },
    {
      subtitle: 'Product Group Code',
      value: data?.productGroupCode?.label,
    },
    {
      subtitle: 'Fixed Commission Percentage',
      value: data?.fixedCommissionPercentage,
    },
    {
      subtitle: 'Inventory Value Zero',
      value: data?.inventoryValueZero ? 'Yes' : 'No',
    },
    {
      subtitle: 'Blocked',
      value: data?.Blocked ? 'Yes' : 'No',
    },
    {
      subtitle: 'Skip Approval',
      value: data?.SkipApproval ? 'Yes' : 'No',
    },
    {
      subtitle: 'Don’t Show in Commission Report',
      value: data?.dontShowCommissionReport ? 'Yes' : 'No',
    },
    {
      subtitle: 'Product Owner',
      value: data?.sellingPriceAfterDiscount,
    },
  ];
  const productPropertieDetailTwo: ProductPropertieDetails[] = [
    {
      subtitle: 'Shelf Number',
      value: data?.shelfNumber?.label,
    },
    {
      subtitle: 'Stockout warning',
      value: data?.stockoutWarning?.label,
    },
    {
      subtitle: 'Supplier',
      value: data?.supplier?.label,
    },
    {
      subtitle: 'Product Category',
      value: data?.productCategory?.code,
    },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6">Inventory</Typography>
      <Stack mt={2} gap={2} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'space-around'}>
        <InventoryDetailCard title={data?.quantityInStock} subTitle="Items in Stock" />
        <InventoryDetailCard
          title={data?.stockInwardQuantity?.totalQuantity}
          subTitle="Stock Inward"
          color="secondary"
          onClick={() => handleChange(null, 'stockInward')}
        />
        <InventoryDetailCard
          title={0}
          subTitle="Blanket Order"
          color="customColor"
          shade="darkGreyOne"
          onClick={() => handleChange(null, 'blanketOrder')}
        />
        <InventoryDetailCard
          title={0}
          subTitle="Stock In-Loan"
          color="customColor"
          shade="darkRed"
          onClick={() => handleChange(null, 'stockInLoan')}
        />
      </Stack>
      <Typography mt={2} variant="h6">
        Product Details
      </Typography>
      <Grid container spacing={2}>
        {productPropertieDetails.map((value, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <ProductProperties key={index} {...value} />
          </Grid>
        ))}
      </Grid>
      <Typography mt={2} variant="h6">
        Inventory Details
      </Typography>
      <Grid container spacing={2}>
        {productPropertieDetailTwo.map((value, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <ProductProperties key={index} {...value} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ProductDetailedInfo;
