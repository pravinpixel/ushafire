import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type ProductQtySplit = {
  _id?: string;
  bayId?: OptionsType | null;
  rackId?: OptionsType | null;
  shelvesId?: OptionsType | null;
  binId?: OptionsType | null;
  quantity?: number | null;
  addQuantity?: number | null;
  availableQuantity?: number | null;
  withdrawQuantity?: number | null;
  maximumQuantity?: number | null;
  warehouseIdQuantity?: number | null;
  status?: boolean;
};
type StockBSRBDetails = {
  warehouseId?: OptionsType | null;
  warehouseIdQuantity: number;
  warehouseIdOutwardQuantity?: number;
  warehouseIdWithdrawQuantity?: number;
  warehouseIdData?: ProductQtySplit[];
};
type StockInOutItemType = {
  productName?: string;
  productId?: OptionsType | null;
  categoryId?: OptionsType | null;
  subCategoryId?: OptionsType | null;
  hsnCode?: string;
  quantity?: number | null;
  existingQuantity?: number | null;
  inwardQuantity?: number | null;
  totalQuantity?: number | null;
  addedStockTotalQuantity?: number | null;
  addedQuantity?: number | null;
  pendingInwardQuantity?: number | null;
  uom?: OptionsType | null;
  rate?: number;
  subTotal?: number;
  tax?: number;
  sku?: string;
  discount?: number;
  total?: number;
  inwardDetails?: ProductQtySplit[];
};

type StockInwardTypeForm = {
  _id?: string;
  stockInwardNumber?: string;
  stockInwardDate?: Dayjs | string;
  supplierId?: OptionsType | null;
  modeOfTransfer?: OptionsType | null;
  warehouseId?: OptionsType | null;
  poNumber?: string;
  poDate?: Dayjs | string;
  stockInwardItems?: StockInOutItemType[];
  purpose?: string;
  poAttachment?: string;
  finalTotal?: number;
  draft?: boolean;
  poId?: string;
  status?: string;
};

type ReceivedReports = {
  _id?: string;
  skuCode?: string;
  productName?: string;
  inwardQty?: number;
  addedQty?: number;
};

interface StockUpdateQtyType extends StockInwardTypeForm {
  stockUpdateQty?: {
    reportNumber?: string;
    totalInwardQty?: number;
    totalAddedQty?: number;
    reportDate?: Dayjs | string;
    receivedReports: ReceivedReports[];
  }[];
}

interface StockInwardListResponse extends PaginationGetInterFace {
  list: StockInwardTypeForm[];
}

type StockInwaedUpdateQtyViewType = {
  list: StockUpdateQtyType['stockUpdateQty'];
  status: string;
};
