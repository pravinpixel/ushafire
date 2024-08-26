import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type SaleOrderTypeForm = {
  _id?: string;
  saleOrderDate?: Dayjs | string;
  saleOrderNumber?: string;
  quotationId?: OptionsType | null;
  quotationNumber?: string;
  quotationDate?: Dayjs | string;
  customerId?: OptionsType | null;
  salePersonId?: OptionsType | null;
  location?: string | null;
  status?: 'Denied' | 'Pending' | 'Approved' | 'Waiting for Approval' | 'So Cancelled' | 'Save as Draft' | 'Processing';
  billingAddress?: string | null;
  shippingAddress?: string | null;
  paymentMode?: OptionsType | null;
  saleInvoiceCommitmentDate?: Dayjs | string;
  draft?: boolean;
  approvePage?: boolean;
  saleOrderItems?: SalesOrderItem[];
};

type SalesOrderItem = {
  _id?: string;
  _id?: string;
  productId?: OptionsType | null;
  UOM?: OptionsType | null;
  SKU?: string;
  quantity?: number;
  availableQuantity?: number;
  rate?: number;
  subTotal?: number;
  total?: number;
  tax?: number;
  stockStatus?: string;
};

interface SaleOrderResponse extends PaginationGetInterFace {
  list: SaleOrderTypeForm[];
}
