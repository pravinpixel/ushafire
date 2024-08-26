import { OptionsType } from '../GlobalTypes';

type StockLevelIndicatorRes = {
  id: string;
  SKU: string;
  minimumOrderQuantity: string;
  quantity: string;
  categoryId: OptionsType;
  productId: OptionsType;
  subcategoryId: OptionsType;
  warehouse: OptionsType;
};
