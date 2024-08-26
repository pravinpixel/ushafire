import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';
import { StockBSRBDetails } from '../inventory-management/StockInwardType';

type SalesReturnFormType = {
  _id?: string;
  returnNo?: string;
  returnDate?: Dayjs | string;
  salesInvoiceId?: OptionsType | null;
  returnReason?: string;
  customerId?: OptionsType | null;
  returnStatus?: OptionsType | null;
  remarks?: string;
  salesReturnItems?: SalesReturnItem[];
};

type SalesReturnItem = {
  _id?: string;
  salesReturnId?: OptionsType | null;
  productId?: OptionsType | null;
  sku?: string;
  quantity?: number;
  actualQuantity?: number;
  damagedQuantity?: number;
  returnQuantity?: number;
  tempQuantity?: number;
  productCondition?: OptionsType | null;
  returnDetails?: StockBSRBDetails[];
};
interface SalesReturnListResponse extends PaginationGetInterFace {
  list: SalesReturnFormType[];
}
