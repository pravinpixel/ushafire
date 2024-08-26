/* eslint-disable max-lines */
import { PaginationInterFace } from 'helper/types/TableTypes';
import { LoansTypeForm } from 'helper/types/sales-crm-system/LoansTypes';
import { EditRequestType, CreateRequestType } from 'helper/types/GlobalTypes';
import { ContactsTypeForm } from 'helper/types/sales-crm-system/ContactsTypes';
import { LeadFormType } from 'helper/types/sales-crm-system/LeadManagementTypes';
import { PoRequestFormType } from 'helper/types/sales-crm-system/PoRequestTypes';
import { SaleOrderTypeForm } from 'helper/types/sales-crm-system/SalesOrderTypes';
import { LoanReturnFormType } from 'helper/types/sales-crm-system/LoanReturnType';
import { OpportunityFormType } from 'helper/types/sales-crm-system/OpportunityTypes';
import { SalesReturnFormType } from 'helper/types/sales-crm-system/SalesReturnTypes';
import { OrganizationFormType } from 'helper/types/sales-crm-system/OrganizationTypes';
import { SalesInvoiceFormType } from 'helper/types/sales-crm-system/SalesInvoiceTypes';
import { BlanketOrderFormType } from 'helper/types/sales-crm-system/BlanketOrderTypes';
import { PurchaseOrderTypeForm } from 'helper/types/sales-crm-system/PurchaseOrderTypes';
import { DealsFormType, DealsopportunityStage } from 'helper/types/sales-crm-system/DealsTypes';
import { QuotationItem, QuotationFormType } from 'helper/types/sales-crm-system/QuotationTypes';

import API from 'configs/AxiosConfig';

const PurchaseOrderUrl = '/purchase-order';
// const PurchaseOrderDraftUrl = '/purchase-order/draft';
const ContactsUrl = '/contact';
const LoansUrl = '/loan';
const SalesOrderUrl = '/sale-order';
const SalesOrderDraftUrl = '/sale-order/draft';
const LeadUrl = '/leadmanagement';
const LeadDraftUrl = '/leadmanagement/draft';
const OpportunityUrl = '/opportunity';
const OpportunityDraftUrl = '/opportunity/draft';
const DealsUrl = '/deals';
const SalesInvoiceUrl = '/sales-invoice';
const SalesInvoiceDraftUrl = '/sales-invoice/draft';
const BlanketOrderUrl = '/blanket-order';
const BlanketOrderDraftUrl = '/blanket-order/draft';
const OrganizationUrl = '/organization';
const OrganizationDraftUrl = '/organization/draft';
const QuotationUrl = '/quotation';
const SalesReturnUrl = '/sales-return';
const PoRequestUrl = '/porequest';
const ToPotUrl = '/topurchaseorder';
const LoanReturnUrl = '/loan-return';

export const PurchaseOrderListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(PurchaseOrderUrl, { params });
  return response.data;
};

export const PurchaseOrderCreateApi = async ({ formData }: CreateRequestType<PurchaseOrderTypeForm>) => {
  const response = await API.post(PurchaseOrderUrl, formData);
  return response;
};

export const PurchaseOrderEditApi = async ({ formData, id }: EditRequestType<PurchaseOrderTypeForm>) => {
  const response = await API.put(PurchaseOrderUrl + '/' + id, formData);
  return response;
};
export const PurchaseOrderSentMailApi = async (id: string) => {
  const response = await API.get(PurchaseOrderUrl + '/tostockinward/' + id);
  return response;
};

export const PurchaseOrderView = async (id?: string) => {
  const response = await API.get(PurchaseOrderUrl + '/' + id);
  return response.data as PurchaseOrderTypeForm;
};

export const PurchaseOrderDelete = async (id: string) => {
  const response = await API.delete(PurchaseOrderUrl + '/' + id);
  return response;
};

export const ContactsListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(ContactsUrl, { params });
  return response.data;
};

export const ContactSingleApi = async (id?: string) => {
  const response = await API.get(ContactsUrl + '/' + id);
  return response.data as ContactsTypeForm;
};

export const ContactDelete = async (id: string) => {
  const response = await API.delete(ContactsUrl + '/' + id);
  return response;
};
export const ContactStatus = async (formData: { id: string; status: boolean }) => {
  const response = await API.patch(ContactsUrl + '/' + formData.id, formData);
  return response;
};
export const ContactSendMail = async (id: string) => {
  const response = await API.get(ContactsUrl + '/sent/mail/' + id);
  return response;
};
export const ContactCreateApi = async ({ formData }: CreateRequestType<ContactsTypeForm>) => {
  const response = await API.postForm(ContactsUrl, formData);
  return response;
};
export const ContactEditApi = async ({ formData, id }: EditRequestType<ContactsTypeForm>) => {
  const response = await API.putForm(ContactsUrl + '/' + id, formData);
  return response;
};
export const GenratePasswordApi = async () => {
  const response = await API.get('contact/generate/api-password');
  return response.data;
};

export const LoansListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(LoansUrl, { params });
  return response.data;
};

export const LoansCreateApi = async ({ formData }: CreateRequestType<LoansTypeForm>) => {
  const response = await API.post(LoansUrl, formData);
  return response;
};

export const LoansViewApi = async (id?: string) => {
  const response = await API.get(LoansUrl + '/' + id);
  return response.data as LoansTypeForm;
};

export const LoansEditApi = async ({ formData, id }: EditRequestType<LoansTypeForm>) => {
  const response = await API.put(LoansUrl + '/' + id, formData);
  return response;
};

export const LoansDeleteApi = async (id: string) => {
  const response = await API.delete(LoansUrl + '/' + id);
  return response;
};

export const SalesOrderListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(SalesOrderUrl, { params });
  return response.data;
};

export const SalesOrderCreateApi = async ({ formData }: CreateRequestType<SaleOrderTypeForm>) => {
  const response = await API.post(formData?.status === 'Save as Draft' ? SalesOrderDraftUrl : SalesOrderUrl, formData);
  return response;
};

export const SalesOrderEditApi = async ({ formData, id }: EditRequestType<SaleOrderTypeForm>) => {
  const response = await API.put((formData?.status === 'Save as Draft' ? SalesOrderDraftUrl : SalesOrderUrl) + '/' + id, formData);
  return response;
};
export const SalesOrderViewApi = async (id?: string) => {
  const response = await API.get(SalesOrderUrl + '/' + id);
  return response.data as SaleOrderTypeForm;
};

export const SalesOrderDelete = async (id: string) => {
  const response = await API.delete(SalesOrderUrl + '/' + id);
  return response;
};

export const LeadListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(LeadUrl, { params });
  return response.data;
};
export const LeadCreateApi = async ({ formData }: CreateRequestType<LeadFormType>) => {
  const response = await API.post(formData?.draft ? LeadDraftUrl : LeadUrl, formData);
  return response;
};

export const LeadEditApi = async ({ formData, id }: EditRequestType<LeadFormType>) => {
  const response = await API.put((formData?.draft ? LeadDraftUrl : LeadUrl) + '/' + id, formData);
  return response;
};

export const LeadView = async (id?: string) => {
  const response = await API.get(LeadUrl + '/' + id);
  return response.data as LeadFormType;
};

export const LeadDelete = async (id: string) => {
  const response = await API.delete(LeadUrl + '/' + id);
  return response;
};

export const OpportunityListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(OpportunityUrl, { params });
  return response.data;
};
export const OpportunityCreateApi = async ({ formData }: CreateRequestType<OpportunityFormType>) => {
  const response = await API.post(formData?.draft ? OpportunityDraftUrl : OpportunityUrl, formData);
  return response;
};

export const OpportunityEditApi = async ({ formData, id }: EditRequestType<OpportunityFormType>) => {
  const response = await API.put((formData?.draft ? OpportunityDraftUrl : OpportunityUrl) + '/' + id, formData);
  return response;
};
export const OpportunityView = async (id?: string) => {
  const response = await API.get(OpportunityUrl + '/' + id);
  return response.data as OpportunityFormType;
};

export const OpportunityDelete = async (id: string) => {
  const response = await API.delete(OpportunityUrl + '/' + id);
  return response;
};

export const DealsListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(DealsUrl, { params });
  return response.data;
};
export const DealsCreateApi = async ({ formData }: CreateRequestType<DealsFormType>) => {
  const response = await API.post(DealsUrl, formData);
  return response;
};

export const DealsEditApi = async ({ formData, id }: EditRequestType<DealsopportunityStage>) => {
  const response = await API.patch(DealsUrl + '/' + id, formData);
  return response;
};
export const DealsView = async (id?: string) => {
  const response = await API.get(DealsUrl + '/' + id);
  return response.data as DealsFormType;
};

export const DealsDelete = async (id: string) => {
  const response = await API.delete(DealsUrl + '/' + id);
  return response;
};

export const SalesInvoiceListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(SalesInvoiceUrl, { params });
  return response.data;
};
export const SalesInvoiceCreateApi = async ({ formData }: CreateRequestType<SalesInvoiceFormType>) => {
  const response = await API.post(SalesInvoiceUrl, formData);
  return response;
};

export const SalesInvoiceEditApi = async ({ formData, id }: EditRequestType<SalesInvoiceFormType>) => {
  const response = await API.put((formData.status === 'Draft' ? SalesInvoiceDraftUrl : SalesInvoiceUrl) + '/' + id, formData);
  return response;
};
export const SalesInvoiceView = async (id?: string) => {
  const response = await API.get(SalesInvoiceUrl + '/' + id);
  return response.data as SalesInvoiceFormType;
};
export const SalesInvoiceToStockOutward = async (id: string) => {
  const response = await API.get(SalesInvoiceUrl + '/tostockoutward/' + id);
  return response;
};
export const SalesInvoiceDelete = async (id: string) => {
  const response = await API.delete(SalesInvoiceUrl + '/' + id);
  return response;
};

export const BlanketOrderListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(BlanketOrderUrl, { params });
  return response.data;
};
export const BlanketOrderCreateApi = async ({ formData }: CreateRequestType<BlanketOrderFormType>) => {
  const response = await API.post(formData.status === 'Save as Draft' ? BlanketOrderDraftUrl : BlanketOrderUrl, formData);
  return response;
};

export const BlanketOrderEditApi = async ({ formData, id }: EditRequestType<BlanketOrderFormType>) => {
  const response = await API.put((formData.status === 'Save as Draft' ? BlanketOrderDraftUrl : BlanketOrderUrl) + '/' + id, formData);
  return response;
};
export const BlanketOrderView = async (id?: string) => {
  const response = await API.get(BlanketOrderUrl + '/' + id);
  return response.data as BlanketOrderFormType;
};

export const BlanketOrderDelete = async (id: string) => {
  const response = await API.delete(BlanketOrderUrl + '/' + id);
  return response;
};

export const QuotationListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(QuotationUrl, { params });
  return response.data;
};
export const QuotationCreateApi = async ({ formData }: CreateRequestType<QuotationFormType>) => {
  const response = await API.post(QuotationUrl, formData);
  return response;
};

export const QuotationEditApi = async ({ formData, id }: EditRequestType<QuotationFormType>) => {
  const response = await API.put(QuotationUrl + '/' + id, formData);
  return response;
};
export const QuotationView = async (id?: string) => {
  const response = await API.get(QuotationUrl + '/' + id);
  return response.data as QuotationFormType;
};

export const QuotationDelete = async (id: string) => {
  const response = await API.delete(QuotationUrl + '/' + id);
  return response;
};
export const QuotationAddBreakUpApi = async (formData: QuotationItem) => {
  const response = await API.post(QuotationUrl + '/breakup', formData);
  return response.data as QuotationItem;
};
export const OrganizationListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(OrganizationUrl, { params });
  return response.data;
};
export const OrganizationCreateApi = async ({ formData }: CreateRequestType<OrganizationFormType>) => {
  const response = await API.post(formData?.draft ? OrganizationDraftUrl : OrganizationUrl, formData);
  return response;
};

export const OrganizationEditApi = async ({ formData, id }: EditRequestType<OrganizationFormType>) => {
  const response = await API.put((formData?.draft ? OrganizationDraftUrl : OrganizationUrl) + '/' + id, formData);
  return response;
};
export const OrganizationView = async (id?: string) => {
  const response = await API.get(OrganizationUrl + '/' + id);
  return response.data as OrganizationFormType;
};

export const OrganizationDelete = async (id: string) => {
  const response = await API.delete(OrganizationUrl + '/' + id);
  return response;
};

export const PoRequestListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(PoRequestUrl, { params });
  return response.data;
};
export const PoRequestCreateApi = async ({ formData }: CreateRequestType<PoRequestFormType>) => {
  const response = await API.post(PoRequestUrl, formData);
  return response;
};

export const PoRequestEditApi = async ({ formData, id }: EditRequestType<PoRequestFormType>) => {
  const response = await API.put(PoRequestUrl + '/' + id, formData);
  return response;
};
export const PoRequestView = async (id?: string) => {
  const response = await API.get(PoRequestUrl + '/' + id);
  return response.data as PoRequestFormType;
};

export const PoRequestDelete = async (id: string) => {
  const response = await API.delete(PoRequestUrl + '/' + id);
  return response;
};

export const SalesReturnListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(SalesReturnUrl, { params });
  return response.data;
};
export const SalesReturnCreateApi = async ({ formData }: CreateRequestType<SalesReturnFormType>) => {
  const response = await API.post(SalesReturnUrl, formData);
  return response;
};

export const SalesReturnEditApi = async ({ formData, id }: EditRequestType<SalesReturnFormType>) => {
  const response = await API.put(SalesReturnUrl + '/' + id, formData);
  return response;
};
export const SalesReturnView = async (id?: string) => {
  const response = await API.get(SalesReturnUrl + '/' + id);
  return response.data as SalesReturnFormType;
};

export const SalesReturnDelete = async (id: string) => {
  const response = await API.delete(SalesReturnUrl + '/' + id);
  return response;
};
export const LoanReturnListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(LoansUrl + '/loan-return/list', { params });
  return response.data;
};
export const LoanReturnCreateApi = async ({ formData }: CreateRequestType<LoanReturnFormType>) => {
  const response = await API.post(LoanReturnUrl, formData);
  return response;
};

export const LoanReturnEditApi = async ({ formData, id }: EditRequestType<LoanReturnFormType>) => {
  const response = await API.put(LoanReturnUrl + '/' + id, formData);
  return response;
};
export const LoanReturnView = async (id?: string) => {
  const response = await API.get(LoanReturnUrl + '/' + id);
  return response.data as LoanReturnFormType;
};

export const LoanReturnDelete = async (id: string) => {
  const response = await API.delete(LoanReturnUrl + '/' + id);
  return response;
};

export const SaleOrderToSaleInvoice = async (id: string) => {
  const response = await API.post(SalesOrderUrl + SalesInvoiceUrl + '/' + id);
  return response;
};
export const LoanToSalesInvoice = async (id: string) => {
  const response = await API.post(LoansUrl + SalesInvoiceUrl + '/' + id);
  return response;
};
export const BlanketToSalesInvoice = async (id: string) => {
  const response = await API.post(BlanketOrderUrl + SalesInvoiceUrl + '/' + id);
  return response;
};

export const LeadToOpportunity = async (id: string) => {
  const response = await API.post(LeadUrl + OpportunityUrl + '/' + id);
  return response;
};
export const OpportunityToQuotation = async (id: string) => {
  const response = await API.post(OpportunityUrl + QuotationUrl + '/' + id);
  return response;
};

export const QuotationToBlanketOrder = async (id: string) => {
  const response = await API.post(QuotationUrl + '/blanketOrder/' + id);
  return response;
};

export const QuotationToSaleOrder = async (id: string) => {
  const response = await API.post(QuotationUrl + SalesOrderUrl + '/' + id);
  return response;
};

export const QuotationToLoan = async (id: string) => {
  const response = await API.post(QuotationUrl + LoansUrl + '/' + id);
  return response;
};
export const QuotationClone = async (id: string) => {
  const response = await API.post(QuotationUrl + '/clone/' + id);
  return response;
};
export const BlanketPORequest = async (id: string) => {
  const response = await API.get(BlanketOrderUrl + ToPotUrl + '/' + id);
  return response;
};
export const SOPORequest = async (id: string) => {
  const response = await API.get(SalesOrderUrl + ToPotUrl + '/' + id);
  return response;
};
export const LoanPORequest = async (id: string) => {
  const response = await API.get(LoansUrl + ToPotUrl + '/' + id);
  return response;
};
