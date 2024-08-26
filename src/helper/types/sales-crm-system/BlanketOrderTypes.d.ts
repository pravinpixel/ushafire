import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type BreakUpItems = {
  month?: OptionsType | null;
  quantity?: number;
};

type BlanketOrderItem = {
  _id?: string;
  productId?: OptionsType | null;
  sku?: string;
  UOM?: OptionsType | null;
  month?: OptionsType | null;
  frequency?: number;
  deliverySlot?: number;
  quantity?: number;
  monthWiseQuantity?: number;
  availableQuantity?: number;
  rate?: number;
  discount?: number;
  tax?: number;
  total?: number;
  breakUps?: BreakUpItems[];
  stockStatus?: string;
};

type BlanketOrderFormType = {
  _id?: string;
  quotationNumber?: string;
  blanketOrderNumber?: string;
  blanketOrderDate?: Dayjs | string;
  quotationDate?: Dayjs | string;
  approvePage?: boolean;
  quotationId?: OptionsType | null;
  customerId?: OptionsType | null;
  location?: string;
  billingAddress?: string;
  shippingAddress?: string;
  status?:
    | 'Denied'
    | 'Pending'
    | 'Approved'
    | 'Waiting for Approval'
    | 'PO Raised'
    | 'In Stock'
    | 'Out of Stock'
    | 'Save as Draft'
    | 'FullFilled'
    | 'Processing';
  salePersonId?: OptionsType | null;
  paymentMode?: OptionsType | null;
  deliveryDate?: Dayjs | string;
  blanketOrderItems?: BlanketOrderItem[];
};

interface BlanketOrderListResponse extends PaginationGetInterFace {
  list: BlanketOrderFormType[];
}
