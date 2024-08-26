/**
 * This file is part of AutoPack.
 *
 * This Product view card
 *
 */
import { Box, Card, Chip, Avatar, Typography } from '@mui/material';

import { useRouter, useModuleFinder } from 'helper/CustomHooks';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';
import { pxToRem, hexToRgba, handleColor, PROJECT_CONSTANTS } from 'helper/GlobalHelper';

type Props = {
  disable?: boolean;
  value?: ProductFormType;
};

const ProductCard = ({ disable, value }: Props) => {
  const { pushById } = useRouter();
  const finder = useModuleFinder();
  const Path = finder.find('product-inventory')?.view?.path;
  return (
    <Card
      variant="productCard"
      color={disable ? 'grey' : ''}
      onClick={() =>
        pushById({
          path: Path,
          id: value?._id,
        })
      }
    >
      <Box flex={1} p={'10px'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Chip label={value?.status} size="small" color={handleColor(value?.status)} />
        </Box>
        <Box pt={'3px'} display={'flex'} justifyContent={'center'} gap={1}>
          <Avatar
            sx={{
              height: pxToRem(152),
              width: pxToRem(146),
            }}
            variant="square"
            src={value?.productImages?.[0]?.imagePath}
          />
        </Box>
        <Typography variant="subtitle1" fontWeight={({ typography }) => typography.fontWeightBold}>
          {value?.productName}
        </Typography>
        <Typography variant="subtitle3" color={({ palette }) => palette.grey[700]}>
          {value?.productCategory?.label}
        </Typography>
        <Typography variant="subtitle3" color={({ palette }) => palette.grey[700]}>
          {value?.productSubCategory?.label}
        </Typography>
      </Box>
      <Box
        borderTop={({ palette }) => `1px solid ${hexToRgba(disable ? palette.customColor.darkGreyOne : palette.primary.lighter ?? '', 0.3)}`}
        bgcolor={({ palette }) => (disable ? palette.customColor.ligthGreyOne : palette.primary.backgoundColorLight)}
        height={pxToRem(45)}
        color={({ palette }) => (disable ? palette.customColor.darkGreyOne : palette.primary.main)}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={'0px 12px'}
      >
        <Typography>
          {PROJECT_CONSTANTS.DOLLER} {value?.sellingPrice}
        </Typography>
        <Typography>View Details</Typography>
      </Box>
    </Card>
  );
};

export default ProductCard;
