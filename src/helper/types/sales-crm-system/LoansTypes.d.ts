import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type LoanItem = {
  _id?: string;
  productId?: OptionsType | null;
  sku?: string;
  UOM?: OptionsType | null;
  quantity?: number;
  availableQuantity?: number;
  price?: number;
  rate?: number;
  commission?: number;
  subTotal?: number;
  total?: number;
  stockStatus?: string;
};
type LoansTypeForm = {
  _id?: string;
  loanNumber?: string;
  loanDate?: Dayjs | string;
  customerId?: OptionsType | null;
  location?: string;
  dateOfReturn?: Dayjs | string;
  approvePage?: boolean;
  purpose?: string;
  remarks?: string;
  quotationId?: OptionsType | null;
  quotationDate?: Dayjs | string;
  customerId?: OptionsType | null;
  status?: 'Opened' | 'Pending' | 'Approved' | 'Delivered' | 'Closed' | 'Waiting for Approval' | 'Denied' | 'Processing';
  salePersonId?: OptionsType | null;
  purpose?: string;
  remarks?: string;
  loanItems?: LoanItem[];
  quotationNumber?: string;
  returnDays?: number;
};
interface LoansResponse extends PaginationGetInterFace {
  list: LoansTypeForm[];
}
