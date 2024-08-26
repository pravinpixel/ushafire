import { PROJECT_CONSTANTS } from 'helper/GlobalHelper';

import { PaginationGetInterFace } from '../TableTypes';
import { OptionsType, ImageResponse, DeletedIdsType } from '../GlobalTypes';

type ProductFormType = {
  _id?: string;
  productName: string;
  productCode: string;
  productImages: ImageResponse[];
  [key in `productImages${PROJECT_CONSTANTS.DeleteKey}`]: DeletedIdsType;
  SKU: string;
  description: string;
  productType: OptionsType | null;
  brand: OptionsType | null;
  type: OptionsType | null;
  UOM: OptionsType | null;
  newItemNumber: string;
  oldItemNumber: string;
  alternativeItemNumber: string;
  DuplicateItemCode: string;
  dimension?: {
    L: number;
    B: number;
    H: number;
  };
  weight?: {
    weight: number;
    unit: strings;
  };
  itemCategoryCode: OptionsType | null;
  productGroupCode: OptionsType | null;
  productSubCategory: OptionsType | null;
  relatedProducts: OptionsType[] | null;
  fixedCommissionPercentage: number | null;
  inventoryValueZero: boolean;
  Blocked: boolean;
  SkipApproval: boolean;
  dontShowCommissionReport: boolean;
  shelfNumber: OptionsType | null;
  QuantityOnSalesOrder: string;
  inventory: string;
  stockoutWarning: OptionsType | null;
  unitVolume: string;
  quantityOnPunchOrder?: number;
  minimumOrderQuantity?: number;
  supplier: OptionsType | null;
  productCategory: OptionsType | null;
  productSubCategory: OptionsType | null;
  manufacturer: string;
  quantityInStock?: number;
  productStatus: OptionsType | null;
  salesUOM: OptionsType | null;
  costPrice?: number;
  sellingPrice?: number;
  taxPercentage?: number;
  sellingPriceAfterDiscount?: number;
  status?: 'Out of Stock' | 'In Stock';
  stockInwardQuantity?: {
    totalQuantity?: number;
  };
  hsnCode?: string;
  productUrls?: {
    _id?: string;
    title: string;
    url: string;
  }[];
  relatedProducts: OptionsType[] | [];
  // eslint-disable-next-line no-unused-vars
} & { [key in `productImages${PROJECT_CONSTANTS.DeleteKey}`]: DeletedIdsType };

interface ProductListResponse extends PaginationGetInterFace {
  list: ProductFormType[];
}

type SearchFilterOptions = {
  [key: unknown]: string;
};
