import { Dayjs } from 'dayjs';

import { LoanItem } from './LoansTypes';
import { OptionsType } from '../GlobalTypes';
import { SalesOrderItem } from './SalesOrderTypes';
import { PaginationGetInterFace } from '../TableTypes';
import { BreakUpItems, BlanketOrderItem } from './BlanketOrderTypes';
import { ProductFormType } from '../inventory-management/ProductInventoryType';

type QuotationItem = {
  _id?: string;
  productId?: OptionsType | null;
  sku?: string;
  quantity?: number;
  // price?: number;
  rate?: number;
  subTotal?: number;
  commission?: number;
  discount?: number;
  tax?: number;
  total?: number;
  availableQuantity?: number;
  UOM?: OptionsType | null;
  salePersonId?: OptionsType | null;
  stockStatus?: ProductFormType['status'];
  commission?: number;
  frequency?: number;
  deliverySlot?: number;
  monthWiseQuantity?: number;
  month?: OptionsType | null;
  breakUps?: BreakUpItems[];
};

type QuotationFormType = {
  _id?: string;
  quotationNumber?: string;
  quotationDate?: Dayjs | string;
  opportunityId?: OptionsType | null;
  opportunityNumber?: string;
  opportunityDate?: Dayjs | string;
  customerId?: OptionsType | null;
  leadType?: OptionsType | null;
  deliveryDate?: Dayjs | string;
  salePersonId?: OptionsType | null;
  status?: 'Quote Generated' | 'Pending' | 'Processing' | 'In Stock' | 'Out of Stock';
  generateQuotationBy?: 'Summary' | 'Detailed';
  quotationItems?: (BlanketOrderItem & LoanItem & SalesOrderItem)[];
  approvePage?: boolean;
  isPoRequest?: boolean;
  totalAmount?: number;
};

interface QuotationListResponse extends PaginationGetInterFace {
  list: QuotationFormType[];
}
