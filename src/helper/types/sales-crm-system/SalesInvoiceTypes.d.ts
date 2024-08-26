import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

interface BreakUpData {
  deliveryCount?: number;
  month?: OptionsType | null;
  quantity?: number;
  deliveryDate?: Dayjs | string;
}

type SalesInvoiceFormType = {
  _id?: string;
  salesInvoiceNo?: string;
  salesInvoiceDate?: Dayjs | string;
  saleOrderId?: OptionsType | null;
  saleOrderDate?: Dayjs | string;
  leadType?: OptionsType | null;
  blanketOrderId?: OptionsType | null;
  blanketOrderDate?: Dayjs | string;
  loanId?: OptionsType | null;
  loanDate?: Dayjs | string;
  contact?: string;
  service?: string;
  customerId?: OptionsType | null;
  salePersonId?: OptionsType | null;
  termOfPayment?: string;
  totalAmount?: number;
  transportMode?: string;
  vehicleNumber?: string;
  status?: 'Approved' | 'Denied' | 'Invoice Cancelled' | 'Waiting for Approval' | "Draft";
  approvePage?: boolean;
  salesInvoiceItems?: SalesInvoiceItem[];
};

type SalesInvoiceItem = {
  _id?: string;
  salesInvoiceId?: OptionsType;
  productId?: OptionsType | null;
  sku?: string;
  quantity?: number;
  rate?: number;
  discount?: number;
  UOM?: OptionsType | null;
  monthWiseQuantity?: number;
  deliverySlot?: number;
  frequency?: number;
  breakUps?: BreakUpData[];
  tax?: number;
  subTotal?: number;
  total?: number;
  commission?: number;
};
interface SalesInvoiceListResponse extends PaginationGetInterFace {
  list: SalesInvoiceFormType[];
}
