import React from 'react';

import { Box, Grid, Chip, Paper, Stack, Avatar, Button, Typography, avatarClasses } from '@mui/material';

import { DownLoadIcon } from 'theme/svg';

import { useRouter } from 'helper/CustomHooks';
import { fCurrency } from 'helper/FormatHelper';
import { notify, ModuleType } from 'helper/GlobalHelper';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

import { useDownloadApi } from 'store/hooks/EssentialHooks';
import { useProductDelete } from 'store/hooks/InventoryManagementHook';

import ConfirmationPopup from 'views/components/popups/ConfirmationPopup';
import { TabList, TabItem, TabPanel, TabContainer } from 'views/components/ui-componet/custom-tab';

import {
  ProductHistory,
  ProductSalesReturn,
  ProductStockInward,
  ProductStockInLoan,
  ProductOpportunity,
  ProductViewContext,
  ProductBlanketOrder,
  ProductDetailedInfo,
  ProductStockOutward,
} from './product-detail-tabs';

type Props = {
  data?: ProductFormType;
  permission?: ModuleType;
  id?: string;
  type?: string;
};

type ProductPropertieDetails = { subtitle: string; value?: string | number };

const ProductProperties = ({ subtitle, value }: ProductPropertieDetails) => {
  return (
    <Box border={({ palette }) => '1px solid' + palette.primary.lighter} px={1} py={0.5} borderRadius={1} minWidth={'9.7rem'} minHeight={'3rem'}>
      <Typography variant="subtitle3" color={({ palette }) => palette.grey[700]}>
        {subtitle}
      </Typography>
      <Typography variant="h6" fontSize={'1.4rem'} color={({ palette }) => palette.primary.main}>
        {value}
      </Typography>
    </Box>
  );
};

const ProductViewDetails = ({ data, permission }: Props) => {
  const router = useRouter();
  const [value, setValue] = React.useState('detailedInfo');
  const [confirmModel, setConfirmModel] = React.useState<{
    model: boolean;
    content: string;
    message?: string;
  }>({
    model: false,
    content: '',
    message: '',
  });
  const { mutateAsync: productDelete } = useProductDelete();
  const handleDeleteSumbit = async () => {
    await productDelete(data?._id ?? '', {
      onSuccess: (res) => {
        notify(res);
        router.push(permission?.path ?? '/');
      },
      onError: (err) => notify(err),
    });
  };
  const handleChange = (_event: React.SyntheticEvent | null, newValue: unknown) => {
    setValue(newValue as string);
  };

  const { mutateAsync } = useDownloadApi();

  const handleClickOpen = async (id: string) => {
    await mutateAsync({
      type: 'product',
      id,
    });
  };

  const productPropertieDetails: ProductPropertieDetails[] = [
    {
      subtitle: 'SKU',
      value: data?.SKU,
    },
    {
      subtitle: 'Product Type',
      value: data?.productType?.label,
    },
    {
      subtitle: 'Dimension',
      value: `${data?.dimension?.L} mm x ${data?.dimension?.B} mm x ${data?.dimension?.H} mm`,
    },
    {
      subtitle: 'Weight',
      value: data?.weight?.weight + ' ' + data?.weight?.unit,
    },
    {
      subtitle: 'Cost Price',
      value: fCurrency(data?.costPrice),
    },
    {
      subtitle: 'Selling Price',
      value: fCurrency(data?.sellingPrice),
    },
    {
      subtitle: 'Offer Price',
      value: fCurrency(data?.sellingPriceAfterDiscount),
    },
  ];

  return (
    <ProductViewContext.Provider
      value={{
        data,
        handleChange,
      }}
    >
      <Paper
        key={data?._id}
        sx={{
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={12} md={2}>
            <Stack gap={5} alignItems={'center'} justifyContent={'center'}>
              <Avatar
                variant="square"
                sx={{
                  height: '15rem',
                  width: '100%',
                  [`& .${avatarClasses.img}`]: {
                    objectFit: 'contain',
                  },
                }}
                src={data?.productImages?.[0]?.imagePath}
              />
              <Button fullWidth onClick={() => handleClickOpen(data?.productImages?.[0]?._id as string)} startIcon={<DownLoadIcon />}>
                Download
              </Button>
            </Stack>
          </Grid>
          <Grid item sm={12} md={10}>
            <Stack>
              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <Box>
                  <Chip label="In stock" size="small" color="success" />
                  <Typography variant="h5">{data?.productName}</Typography>
                  <Typography variant="subtitle3" color={({ palette }) => palette.primary.main}>
                    {data?.brand?.label}
                  </Typography>
                </Box>
                <Stack flexDirection={'row'} alignItems={'flex-start'} gap={2}>
                  {permission?.delete?.access && (
                    <Button
                      hidden
                      color="error"
                      onClick={() =>
                        setConfirmModel({
                          ...confirmModel,
                          content: '',
                          model: true,
                        })
                      }
                    >
                      Delete Product
                    </Button>
                  )}
                  {permission?.edit?.access && (
                    <Button
                      hidden={!permission?.edit?.access}
                      variant="outlined"
                      onClick={() => router.pushById({ path: permission?.edit?.path, id: data?._id, access: permission?.edit?.access })}
                    >
                      Edit Product
                    </Button>
                  )}
                </Stack>
              </Stack>
              <Box>
                <Typography variant="subtitle3" color={({ palette }) => palette.grey[500]}>
                  Product Description
                </Typography>
                <Typography variant="subtitle2">{data?.description}</Typography>
                <Stack mt={2} flexDirection={'row'} flexWrap={'wrap'} gap={2}>
                  {productPropertieDetails.map((value, index) => (
                    <ProductProperties key={index} {...value} />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <TabContainer mt={5}>
        <TabList handleChange={handleChange} value={value}>
          <TabItem value="detailedInfo" label="Detailed Info" />
          <TabItem value="stockInward" label="Stock Inward" />
          <TabItem value="blanketOrder" label="Blanket Order" />
          <TabItem value="stockInLoan" label="Stock In-Loan" />
          <TabItem value="stockOutward" label="Stock Outward" />
          <TabItem value="opportunity" label="Opportunity" />
          <TabItem value="salesReturn" label="Sales Return" />
          <TabItem value="productHistory" label="Product History" />
        </TabList>
        <TabPanel value={value} tabValue={'detailedInfo'}>
          <ProductDetailedInfo />
        </TabPanel>
        <TabPanel value={value} tabValue={'stockInward'}>
          <ProductStockInward />
        </TabPanel>
        <TabPanel value={value} tabValue={'blanketOrder'}>
          <ProductBlanketOrder />
        </TabPanel>
        <TabPanel value={value} tabValue={'stockInLoan'}>
          <ProductStockInLoan />
        </TabPanel>
        <TabPanel value={value} tabValue={'opportunity'}>
          <ProductOpportunity />
        </TabPanel>
        <TabPanel value={value} tabValue={'stockOutward'}>
          <ProductStockOutward />
        </TabPanel>
        <TabPanel value={value} tabValue={'salesReturn'}>
          <ProductSalesReturn />
        </TabPanel>
        <TabPanel value={value} tabValue={'productHistory'}>
          <ProductHistory />
        </TabPanel>
      </TabContainer>
      <ConfirmationPopup
        open={confirmModel.model}
        handleClose={() => {
          setConfirmModel({
            ...confirmModel,
            model: false,
          });
        }}
        message={confirmModel.message}
        handleSubmit={handleDeleteSumbit}
        label={'Delete Product'}
        sucesslabel={'Product Deleted'}
        content={confirmModel.content}
      />
    </ProductViewContext.Provider>
  );
};

export default ProductViewDetails;
