import { ChipOwnProps } from '@mui/material';

import { handleColor } from 'helper/GlobalHelper';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

export const checkStock: (able: number, qty: number) => { label: ProductFormType['status']; color: ChipOwnProps['color'] } = (able, qty) => {
  if (able >= qty) {
    return { label: 'In Stock', color: handleColor('In Stock') };
  } else {
    return { label: 'Out of Stock', color: handleColor('Out of Stock') };
  }
};
