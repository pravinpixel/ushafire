import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { LoansTypeForm } from './LoansTypes';
import { PaginationGetInterFace } from '../TableTypes';
import { StockBSRBDetails } from '../inventory-management/StockInwardType';

type LoanReturnFormType = LoansTypeForm & {
  _id?: string;
  returnNo?: string;
  returnDate?: Dayjs | string;
  loanId?: OptionsType | null;
  returnReason?: string;
  customerId?: OptionsType | null;
  salePersonId?: OptionsType | null;
  returnStatus?: string;
  dateOfReturn?: Dayjs | string;
  remarks?: string;
  status?: string;
  loanReturnItems?: LoanReturnItem[];
};

type LoanReturnItem = {
  _id?: string;
  salesReturnId?: OptionsType | null;
  productId?: OptionsType | null;
  sku?: string;
  quantity?: number;
  damagedQuantity?: number;
  returnQuantity?: number;
  tempQuantity?: number;
  productCondition?: OptionsType | null;
  rate?: number;
  commission?: number;
  total?: number;
  returnDetails?: StockBSRBDetails[];
};
interface LoanReturnListResponse extends PaginationGetInterFace {
  list: LoanReturnFormType[];
}
