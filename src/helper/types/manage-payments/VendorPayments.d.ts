import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type VendorPaymentItemType = {
  _id?: string;
  paymentMode?: OptionsType | null;
  transactionDate?: Dayjs | null;
  transactionNo?: number;
  totalAmount?: number;
};
type VendorPaymentType = {
  _id?: string;
  po_id?: string;
  poNumber?: string;
  poDate?: Dayjs | null;
  supplier?: OptionsType | null;
  totalAmount?: number;
  totalProduct?: number;
  totalPaid?: number;
  create?: boolean;
  pendingDue?: number;
  vendorPaymentItems?: VendorPaymentItemType[];
};
interface VendorPaymentResponse extends PaginationGetInterFace {
  list: VendorPaymentType[];
}
