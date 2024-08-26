type VisionType = 'User' | 'UserRole' | 'Supplier' | 'Product' | 'LeadManagement';

type GenerateIdType = {
  vision: VisionType;
};

type GenrateCodeType = {
  code: string;
  [key: string]: unknown;
};

type EssentialType =
  | 'Department-sub'
  | 'Department'
  | 'Designation'
  | 'Designation-sub'
  | 'Location'
  | 'Bay'
  | 'Rack'
  | 'Bin'
  | 'Country'
  | 'State'
  | 'BusinessVertical'
  | 'UserRole'
  | 'UserRoleParent'
  | 'UserRoleStatic'
  | 'PaymentTerms'
  | 'Brand'
  | 'Supplier'
  | 'ProductType'
  | 'ProductCategory'
  | 'Type'
  | 'Uom'
  | 'Category'
  | 'Shelf'
  | 'Product'
  | 'Category'
  | 'SubCategory'
  | 'ProductGroup'
  | 'ProductId'
  | 'Category-Subcategory'
  | 'Address'
  | 'Warehouse'
  | 'ProductStatus'
  | 'PaymentTerms'
  | 'WarehouseLocation'
  | 'Warehouse-filter-sku'
  | 'Product-filter-stockstatus'
  | 'SKU'
  | 'Warehouse-filter-category'
  | 'Customer'
  | 'WarehouseWS-wise-product'
  | 'Bin-warehouse'
  | 'Product-filter-supplier'
  | 'Product-filter-category'
  | 'Product-filter-brand'
  | 'Product-filter-stockstatus'
  | 'StockInward-filter-supplier'
  | 'StockOutward-filter-customer'
  | 'Barcode-filter-category'
  | 'Warehouse-filter-product'
  | 'StockInward-filter-supplier'
  | 'Configuration'
  | 'User'
  | 'Opportunity-opportunity-type'
  | 'Lead-lead-type'
  | 'User-sales-target'
  | 'Yes-no'
  | 'Product-weight'
  | 'Product-status'
  | 'SubVertical-BusinessVertical'
  | 'Organization'
  | 'Language-preference'
  | 'Gender'
  | 'Contact-contact-type'
  | 'Preferred-contact'
  | 'Organization-filter-subvertical'
  | 'Organization-filter-businessvertical'
  | 'Organization-filter-paymentterms'
  | 'Lead-filter-leadstatus'
  | 'Lead-filter-contacttype'
  | 'Lead-filter-customer'
  | 'Lead-filter-salesperson'
  | 'Quotation-filter-saleperson'
  | 'Quotation-filter-status'
  | 'Quotation-filter-leadtype'
  | 'Quotation-filter-customer'
  | 'Opportunity-filter-customer'
  | 'Opportunity-filter-salesperson'
  | 'Opportunity-filter-leadSource'
  | 'Opportunity-filter-opportunitystages'
  | 'Opportunity-filter-opportunitystatus'
  | 'Loan-filter-status'
  | 'Loan-filter-saleperson'
  | 'Loan-filter-customer'
  | 'months'
  | 'Quotation'
  | 'Deals-filter-customer'
  | 'Deals-filter-salesperson'
  | 'Deals-filter-contacttype'
  | 'PaymentMode'
  | 'SaleOrder-filter-customer'
  | 'SaleOrder-filter-saleorderstatus'
  | 'BlanketOrder-filter-blanketorderstatus'
  | 'BlanketOrder-filter-customer'
  | 'Loan'
  | 'Sale'
  | 'Blanket'
  | 'TransportMode'
  | 'SalesInvoice'
  | 'SalesInvoiceProduct' | 'SalesReturn-filter-customer' | "ProductCondition";

type EssentialDataType = {
  // eslint-disable-next-line no-unused-vars
  [key in EssentialType]: OptionsType[];
  // UserRoleStatic: {
  //     access_manage?: ModuleType[];
  // };
};

type EssentialReqType = {
  include?: EssentialType[];
  search?: string;
  parentId?: string;
  [key: string]: unknown;
  enabled?: boolean;
};

type ImportUrls = '/warehouse-wise-stock';
type SampleDownloadUrls = 'warehouse-wise-stock/excel-template/download';
