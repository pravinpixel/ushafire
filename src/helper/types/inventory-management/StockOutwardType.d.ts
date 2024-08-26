import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { StockBSRBDetails } from './StockInwardType';
import { PaginationGetInterFace } from '../TableTypes';

type FormSplit = {
  productQtySplit: StockBSRBDetails[];
  quantity: number;
  tempQuantity?: number;
  outwardQuantity?: number;
  withdrawQuantity?: number;
  productId?: OptionsType | null;
  warehouseId?: OptionsType | null;
  warehouseEssential?: OptionsType[];
};
type StockOutwardItemType = {
  _id?: string;
  categoryId?: OptionsType | null;
  subCategoryId?: OptionsType | null;
  productName?: string;
  productId?: OptionsType | null;
  hsnCode?: string;
  existingQuantity: number;
  withdrawQuantity: number;
  availableQuantity: number;
  uom?: OptionsType | null;
  warehouseId?: OptionsType | null;
  outwardQuantity?: number;
  rate?: string;
  subTotal?: string;
  tax?: string;
  sku?: string;
  discount?: string;
  total?: string;
  outwardDetails?: StockBSRBDetails[];
  warehouseEssential?: OptionsType[];
};
type StockOutwardTypeForm = {
  _id?: string;
  stockOutwardNumber?: string;
  stockOutwardDate?: Dayjs | string;
  customerId?: OptionsType | null;
  warehouseId?: OptionsType | null;
  modeOfTransfer?: OptionsType | null;
  finalTotal?: number;
  stockOutwardItems?: StockOutwardItemType[];
  purpose?: string;
  draft?: boolean;
  status?: 'Pending' | 'Opened' | 'Fulfilled';
};

type ReceivedReports = {
  _id?: string;
  skuCode?: string;
  productName?: string;
  addedQty?: number;
  outwardQty?: number;
};

interface StockUpdateQtyType extends StockInwardTypeForm {
  stockUpdateQty?: {
    reportNumber?: string;
    totalInwardQty?: number;
    totalAddedQty?: number;
    reportDate?: Dayjs | string;
    issuedReports: ReceivedReports[];
  }[];
}

interface StockOutwardListResponse extends PaginationGetInterFace {
  list: StockOutwardTypeForm[];
}

type StockOutwardUpdateQtyViewType = {
  list: StockUpdateQtyType['stockUpdateQty'];
  status: string;
};
