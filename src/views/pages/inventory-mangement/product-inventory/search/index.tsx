import { useState } from 'react';

import { Paper, Stack, Typography } from '@mui/material';

import { useRouter } from 'helper/CustomHooks';
import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { ProductFormType, ProductListResponse } from 'helper/types/inventory-management/ProductInventoryType';

import { useGlobalSearchApi } from 'store/hooks/EssentialHooks';

import PageLoader from 'views/components/loader/PageLoader';
import { ProductCard } from 'views/components/ui-componet/cards/ui-cards';
interface ListResponse extends ProductListResponse {
  totalProductCount?: number;
}

const SearchProduct: React.FC<ComponentProps> = () => {
  const { getParams } = useRouter();
  const SearchKey = getParams('query') ?? '';
  const [params] = useState({ ...InitialPagniationParams });
  const { data, isFetching } = useGlobalSearchApi({
    params: { ...params, search: SearchKey },
  });
  const ListData = data as ListResponse;
  return isFetching ? (
    <PageLoader />
  ) : (
    <Paper
      sx={{
        minHeight: '30rem',
        p: '17px 30px',
      }}
    >
      <Typography variant="h6" fontWeight={({ typography }) => typography.fontWeightRegular} color={({ palette }) => palette.primary.main}>
        Search by keyword - {SearchKey}
      </Typography>
      <Typography>
        {'(Results ' +
          ListData.total +
          // ' of ' + ListData?.totalProductCount +
          ' Products)'}
      </Typography>
      <Stack mt={2} mb={5} flexDirection={'row'} flexWrap={'wrap'} gap={2}>
        {ListData?.list.map((value) => <ProductCard value={value} disable={value.status !== 'In Stock'} />)}
      </Stack>

      {ListData?.list?.[0]?.relatedProducts && ListData?.list?.[0]?.relatedProducts?.length > 0 && (
        <>
          <Typography variant="h6" fontWeight={({ typography }) => typography.fontWeightRegular} color={({ palette }) => palette.primary.main}>
            Related Products
          </Typography>
          <Stack mt={2} flexDirection={'row'} flexWrap={'wrap'} gap={2}>
            {ListData?.list?.[0]?.relatedProducts.map((value) => (
              <ProductCard
                value={{ ...value, _id: value?.productId } as unknown as ProductFormType}
                disable={(value?.status as string) !== 'In Stock'}
              />
            ))}
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default SearchProduct;
