import { useQuery, useMutation } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';

import * as MPAPI from 'store/services/ManagePaymentsServices';

export const CustomerPaymentListsKey = 'CustomerPaymentList';
export const VendorPaymentListsKey = 'VendorPaymentList';

export const useCustomerPaymentListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [CustomerPaymentListsKey, params],
    queryFn: () => MPAPI.CustomerPaymentListApi({ params }),
  });
};

export const useCustomerPaymentCreate = () => {
  return useMutation({
    mutationFn: MPAPI.CustomerPaymentCreateApi,
  });
};

export const useCustomerPaymentEdit = () => {
  return useMutation({
    mutationFn: MPAPI.CustomerPaymentEditApi,
  });
};

export const useCustomerPaymentDetailView = ({ params, url }: { params: PaginationInterFace; url?: string }) => {
  return useQuery({
    queryKey: [CustomerPaymentListsKey + 'detail' + url, params],
    queryFn: () => MPAPI.CustomerPaymentDetailView({ params, url }),
  });
};
export const useCustomerPaymentView = (url?: string) => {
  return useQuery({
    queryKey: [VendorPaymentListsKey + url],
    queryFn: () => MPAPI.CustomerPaymentView(url),
  });
};
export const useCustomerPaymentInoviceView = (url?: string) => {
  return useQuery({
    queryKey: [CustomerPaymentListsKey + 'invoice' + url],
    queryFn: () => MPAPI.CustomerPaymentInvoiceView(url),
    enabled: !!url,
  });
};

export const useCustomerPaymentDelete = () => {
  return useMutation({
    mutationFn: MPAPI.CustomerPaymentDelete,
  });
};

export const useVendorPaymentListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [VendorPaymentListsKey, params],
    queryFn: () => MPAPI.VendorPaymentListApi({ params }),
  });
};

export const useVendorPaymentCreate = () => {
  return useMutation({
    mutationFn: MPAPI.VendorPaymentCreateApi,
  });
};

export const useVendorPaymentEdit = () => {
  return useMutation({
    mutationFn: MPAPI.VendorPaymentEditApi,
  });
};

export const useVendorPaymentView = (url?: string) => {
  return useQuery({
    queryKey: [VendorPaymentListsKey + url],
    queryFn: () => MPAPI.VendorPaymentView(url),
  });
};
export const useVendorPaymentDetailView = ({ params, url }: { params: PaginationInterFace; url?: string }) => {
  return useQuery({
    queryKey: [VendorPaymentListsKey + 'detail' + url, params],
    queryFn: () => MPAPI.VendorPaymentDetailView({ params, url }),
  });
};
export const useVendorPaymentPOView = (url?: string) => {
  return useQuery({
    queryKey: [VendorPaymentListsKey + 'PO' + url],
    queryFn: () => MPAPI.VendorPaymentPOView(url),
    enabled: !!url,
  });
};

export const useVendorPaymentDelete = () => {
  return useMutation({
    mutationFn: MPAPI.VendorPaymentDelete,
  });
};
