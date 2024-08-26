import { Dayjs } from 'dayjs';

import { OptionsType } from '../GlobalTypes';
import { PurchaseOrderTypes, PaginationGetInterFace } from '../TableTypes';

type PurchaseOrderItemType = {
  _id?: string;
  productId?: OptionsType | null;
  SKU?: string;
  quantity?: number;
};

type PurchaseOrderTypeForm = {
  _id?: string;
  poNumber?: string;
  poDate?: Dayjs | string;
  supplier?: OptionsType | null;
  paymentTerms?: OptionsType | null;
  type?: PurchaseOrderTypes;
  totalAmount?: string;
  ordertype?: string;
  requestFrom?: 'Quotation' | 'Loan' | 'Sale' | 'Blanket' | null;
  requestFromField?: 'quotation' | 'loan' | 'saleOrder' | 'blanketOrder' | null;
  quotationNumber?: string | null;
  loanNumber?: string | null;
  saleOrderNumber?: string | null;
  blanketOrderNumber?: string | null;
  quotationDate?: Dayjs | string;
  loanDate?: Dayjs | string;
  saleOrderDate?: Dayjs | string;
  approvePage?: boolean;
  blanketOrderDate?: Dayjs | string;
  status?: 'Unknown' | 'Pending' | 'Approved' | 'PO Cancelled' | 'Denied' | 'Draft' | 'Waiting for Approval';
  approvePage?: boolean;
  purchaseOrderItems?: PurchaseOrderItemType[];
};
interface PurchaseOrderResponse extends PaginationGetInterFace {
  list: PurchaseOrderTypeForm[];
}
