import { LoansTypeForm } from './sales-crm-system/LoansTypes';
import { SaleOrderTypeForm } from './sales-crm-system/SalesOrderTypes';
import { BlanketOrderFormType } from './sales-crm-system/BlanketOrderTypes';
import { SalesInvoiceFormType } from './sales-crm-system/SalesInvoiceTypes';
import { PurchaseOrderTypeForm } from './sales-crm-system/PurchaseOrderTypes';

type DashBoardListDataType = {
  loan?: LoansTypeForm[];
  saleOrder?: SaleOrderTypeForm[];
  purchaseOrder?: PurchaseOrderTypeForm[];
  blanketOrder?: BlanketOrderFormType[];
  salesInvoice?: SalesInvoiceFormType[];
};
