/* eslint-disable max-lines */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';

import * as SCRMAPI from 'store/services/SalesCrmSystemService';

export const PurchaseOrderListsKey = 'PurchaseOrderList';
export const ContactsListKey = 'ContactsList';
export const LoansListKey = 'LoansList';
export const SalesOrderListKey = 'SalesOrderList';
export const LeadListKey = 'LeadList';
export const OpportunityListKey = 'OpportunityList';
export const OrganizationListKey = 'OrganizationList';
export const DealsListKey = 'DealsList';
export const SalesInvoiceListKey = 'SalesInvoiceList';
export const BlanketOrderListKey = 'BlanketOrderList';
export const QuotationListKey = 'QuotationList';
export const SalesReturnListKey = 'SalesReturnList';
export const PoRequestListKey = 'PoRequestList';
export const LoanReturnListKey = 'LoanReturnList';

export const usePurchaseOrderListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [PurchaseOrderListsKey, params],
    queryFn: () => SCRMAPI.PurchaseOrderListApi({ params }),
  });
};

export const usePurchaseOrderCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.PurchaseOrderCreateApi,
  });
};

export const usePurchaseOrderEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.PurchaseOrderEditApi,
  });
};

export const usePurchaseOrderSentMail = () => {
  return useMutation({
    mutationFn: SCRMAPI.PurchaseOrderSentMailApi,
  });
};

export const usePurchaseOrderView = (url?: string) => {
  return useQuery({
    queryKey: [PurchaseOrderListsKey + url],
    queryFn: () => SCRMAPI.PurchaseOrderView(url),
  });
};

export const usePurchaseOrderDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.PurchaseOrderDelete,
  });
};

export const useContactsListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [ContactsListKey, params],
    queryFn: () => SCRMAPI.ContactsListApi({ params }),
  });
};

export const useContactCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.ContactCreateApi,
  });
};
export const useContactView = (url?: string) => {
  return useQuery({
    queryKey: [ContactsListKey + url],
    queryFn: () => SCRMAPI.ContactSingleApi(url),
  });
};
export const useContactDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.ContactDelete,
  });
};
export const useContactStatus = () => {
  return useMutation({
    mutationFn: SCRMAPI.ContactStatus,
  });
};
export const useContactSendMail = () => {
  return useMutation({
    mutationFn: SCRMAPI.ContactSendMail,
  });
};
export const useGenratePassword = () => {
  return useMutation({
    mutationFn: SCRMAPI.GenratePasswordApi,
  });
};
export const useContactEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.ContactEditApi,
  });
};

export const useLoansListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [LoansListKey, params],
    queryFn: () => SCRMAPI.LoansListApi({ params }),
  });
};

export const useLoanView = (url?: string) => {
  return useQuery({
    queryKey: [LoansListKey + url],
    queryFn: () => SCRMAPI.LoansViewApi(url),
  });
};

export const useLoansCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoansCreateApi,
  });
};

export const useLoansEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoansEditApi,
  });
};

export const useLoanDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoansDeleteApi,
  });
};

export const useSalesOrderListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [SalesOrderListKey, params],
    queryFn: () => SCRMAPI.SalesOrderListApi({ params }),
  });
};

export const useSalesOrderCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesOrderCreateApi,
  });
};

export const useSalesOrderEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesOrderEditApi,
  });
};
export const useSalesOrderView = (url?: string) => {
  return useQuery({
    queryKey: [LoansListKey + url],
    queryFn: () => SCRMAPI.SalesOrderViewApi(url),
  });
};

export const useSalesOrderDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesOrderDelete,
  });
};

export const useLeadListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [LeadListKey, params],
    queryFn: () => SCRMAPI.LeadListApi({ params }),
  });
};

export const useLeadCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.LeadCreateApi,
  });
};

export const useLeadEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.LeadEditApi,
  });
};
export const useLeadView = (url?: string) => {
  return useQuery({
    queryKey: [LeadListKey + url],
    queryFn: () => SCRMAPI.LeadView(url),
  });
};

export const useLeadDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.LeadDelete,
  });
};

export const useLeadToOpportunity = () => {
  return useMutation({
    mutationFn: SCRMAPI.LeadToOpportunity,
  });
};
export const useOpportunityToQuotation = () => {
  return useMutation({
    mutationFn: SCRMAPI.OpportunityToQuotation,
  });
};

export const useQuotationToBlanketOrder = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationToBlanketOrder,
  });
};
export const useQuotationToSaleOrder = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationToSaleOrder,
  });
};

export const useQuotationToLoan = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationToLoan,
  });
};

export const useSaleOrderToSaleInvoice = () => {
  return useMutation({
    mutationFn: SCRMAPI.SaleOrderToSaleInvoice,
  });
};
export const useLoanToSaleInvoice = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoanToSalesInvoice,
  });
};
export const useBlanketToSaleInvoice = () => {
  return useMutation({
    mutationFn: SCRMAPI.BlanketToSalesInvoice,
  });
};
export const useQuotationClone = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationClone,
  });
};
export const useQuotationBreakUp = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationAddBreakUpApi,
  });
};

export const useOpportunityListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [OpportunityListKey, params],
    queryFn: () => SCRMAPI.OpportunityListApi({ params }),
  });
};

export const useOpportunityCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.OpportunityCreateApi,
  });
};

export const useOpportunityEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.OpportunityEditApi,
  });
};
export const useOpportunityView = (url?: string) => {
  return useQuery({
    queryKey: [OpportunityListKey + url],
    queryFn: () => SCRMAPI.OpportunityView(url),
  });
};

export const useOpportunityDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.OpportunityDelete,
  });
};

export const useOrganizationListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [OrganizationListKey, params],
    queryFn: () => SCRMAPI.OrganizationListApi({ params }),
  });
};

export const useOrganizationCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.OrganizationCreateApi,
  });
};

export const useOrganizationEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.OrganizationEditApi,
  });
};
export const useOrganizationView = (url?: string) => {
  return useQuery({
    queryKey: [OrganizationListKey + url],
    queryFn: () => SCRMAPI.OrganizationView(url),
  });
};

export const useOrganizationDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.OrganizationDelete,
  });
};

export const usePoRequestListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [PoRequestListKey, params],
    queryFn: () => SCRMAPI.PoRequestListApi({ params }),
  });
};

export const usePoRequestCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.PoRequestCreateApi,
  });
};

export const usePoRequestEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.PoRequestEditApi,
  });
};
export const usePoRequestView = (url?: string) => {
  return useQuery({
    queryKey: [PoRequestListKey + url],
    queryFn: () => SCRMAPI.PoRequestView(url),
  });
};

export const usePoRequestDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.PoRequestDelete,
  });
};

export const useSalesInvoiceListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [SalesInvoiceListKey, params],
    queryFn: () => SCRMAPI.SalesInvoiceListApi({ params }),
  });
};

export const useSalesInvoiceCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesInvoiceCreateApi,
  });
};

export const useSalesInvoiceEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesInvoiceEditApi,
  });
};
export const useSalesInvoiceView = (url?: string) => {
  return useQuery({
    queryKey: [SalesInvoiceListKey + url],
    queryFn: () => SCRMAPI.SalesInvoiceView(url),
  });
};

export const useSalesInvoiceDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesInvoiceDelete,
  });
};
export const useSalesInvoiceToStockOutward = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesInvoiceToStockOutward,
  });
};

export const useQuotationListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [QuotationListKey, params],
    queryFn: () => SCRMAPI.QuotationListApi({ params }),
  });
};

export const useQuotationCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationCreateApi,
  });
};

export const useQuotationEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationEditApi,
  });
};
export const useQuotationView = (url?: string) => {
  return useQuery({
    queryKey: [QuotationListKey + url],
    queryFn: () => SCRMAPI.QuotationView(url),
  });
};

export const useQuotationDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.QuotationDelete,
  });
};

export const useBlanketOrderListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [BlanketOrderListKey, params],
    queryFn: () => SCRMAPI.BlanketOrderListApi({ params }),
  });
};

export const useBlanketOrderCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.BlanketOrderCreateApi,
  });
};

export const useBlanketOrderEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.BlanketOrderEditApi,
  });
};
export const useBlanketOrderView = (url?: string) => {
  return useQuery({
    queryKey: [BlanketOrderListKey + url],
    queryFn: () => SCRMAPI.BlanketOrderView(url),
  });
};

export const useBlanketOrderDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.BlanketOrderDelete,
  });
};

export const useSalesReturnListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [SalesReturnListKey, params],
    queryFn: () => SCRMAPI.SalesReturnListApi({ params }),
  });
};

export const useSalesReturnCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesReturnCreateApi,
  });
};

export const useSalesReturnEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesReturnEditApi,
  });
};
export const useSalesReturnView = (url?: string) => {
  return useQuery({
    queryKey: [SalesReturnListKey + url],
    queryFn: () => SCRMAPI.SalesReturnView(url),
  });
};

export const useSalesReturnDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.SalesReturnDelete,
  });
};
export const useLoanReturnListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [LoanReturnListKey, params],
    queryFn: () => SCRMAPI.LoanReturnListApi({ params }),
  });
};

export const useLoanReturnCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoanReturnCreateApi,
  });
};

export const useLoanReturnEdit = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoanReturnEditApi,
  });
};
export const useLoanReturnView = (url?: string) => {
  return useQuery({
    queryKey: [LoanReturnListKey + url],
    queryFn: () => SCRMAPI.LoanReturnView(url),
  });
};

export const useLoanReturnDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoanReturnDelete,
  });
};

export const useDealsListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [DealsListKey, params],
    queryFn: () => SCRMAPI.DealsListApi({ params }),
  });
};

export const useDealsCreate = () => {
  return useMutation({
    mutationFn: SCRMAPI.DealsCreateApi,
  });
};

export const useDealsEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: SCRMAPI.DealsEditApi,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [DealsListKey] });
    },
  });
};
export const useDealsView = (url?: string) => {
  return useQuery({
    queryKey: [DealsListKey + url],
    queryFn: () => SCRMAPI.DealsView(url),
  });
};

export const useDealsDelete = () => {
  return useMutation({
    mutationFn: SCRMAPI.DealsDelete,
  });
};

export const useBlanketToPO = () => {
  return useMutation({
    mutationFn: SCRMAPI.BlanketPORequest,
  });
};
export const useSoToPO = () => {
  return useMutation({
    mutationFn: SCRMAPI.SOPORequest,
  });
};
export const useLoanToPO = () => {
  return useMutation({
    mutationFn: SCRMAPI.LoanPORequest,
  });
};
