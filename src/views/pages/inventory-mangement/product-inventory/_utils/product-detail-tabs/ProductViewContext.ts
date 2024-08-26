import { createContext } from 'react';

import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';
export type ProductViewContextType = {
  data?: ProductFormType;
  handleChange: (_event: React.SyntheticEvent | null, newValue: unknown) => void;
};
export const ProductViewContext = createContext<ProductViewContextType>({
  handleChange: () => null,
});
