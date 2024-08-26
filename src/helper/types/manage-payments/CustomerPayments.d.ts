import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type CustomerPaymentItemType = {
  _id?: string;
  paymentMode?: OptionsType | null;
  accountNumber?: string;
  bankName?: string;
  branch?: string;
  IFSCCode?: string;
  transactionDate?: Dayjs | string;
  transactionNo?: string;
  totalAmount?: number;
};
type CustomerPaymentType = {
  _id?: string;
  salesInvoiceNo?: string;
  salesInvoiceDate?: Dayjs | string;
  customerId?: OptionsType | null;
  totalAmount?: number;
  totalProduct?: number;
  totalPaid?: number;
  pendingDue?: number;
  beneficiaryName?: string;
  beneficiaryAccountNo?: string;
  beneficiaryBankName?: string;
  beneficiaryIFSCCode?: string;
  create?: boolean;
  customerPaymentItems?: CustomerPaymentItemType[];
};
interface CustomerPaymentResponse extends PaginationGetInterFace {
  list: CustomerPaymentType[];
}
