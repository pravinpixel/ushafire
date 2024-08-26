import { PaginationInterFace } from 'helper/types/TableTypes';
import { EditRequestType, CreateRequestType } from 'helper/types/GlobalTypes';
import { VendorPaymentType, VendorPaymentResponse } from 'helper/types/manage-payments/VendorPayments';
import { CustomerPaymentType, CustomerPaymentResponse } from 'helper/types/manage-payments/CustomerPayments';

import API from 'configs/AxiosConfig';

const CustomerPaymentUrl = '/customer-payment';
const VendorPaymentUrl = '/vendor-payment';

export const CustomerPaymentListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(CustomerPaymentUrl, { params });
  return response.data;
};

export const CustomerPaymentCreateApi = async ({ formData }: CreateRequestType<CustomerPaymentType>) => {
  const response = await API.post(CustomerPaymentUrl, formData);
  return response;
};

export const CustomerPaymentEditApi = async ({ formData, id }: EditRequestType<CustomerPaymentType>) => {
  const response = await API.put(CustomerPaymentUrl + '/' + id, formData);
  return response;
};

export const CustomerPaymentView = async (id?: string) => {
  const response = await API.get(CustomerPaymentUrl + '/' + id);
  return response.data as CustomerPaymentType;
};
export const CustomerPaymentDetailView = async ({ params, url }: { params: PaginationInterFace; url?: string }) => {
  const response = await API.get(CustomerPaymentUrl + '/view/' + url, { params });
  return response.data as CustomerPaymentResponse;
};
export const CustomerPaymentDelete = async (id: string) => {
  const response = await API.delete(CustomerPaymentUrl + '/' + id);
  return response;
};
export const CustomerPaymentInvoiceView = async (id?: string) => {
  const response = await API.get(CustomerPaymentUrl + '/invoice/' + id);
  return response.data as CustomerPaymentType;
};
export const VendorPaymentListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(VendorPaymentUrl, { params });
  return response.data;
};

export const VendorPaymentCreateApi = async ({ formData }: CreateRequestType<VendorPaymentType>) => {
  const response = await API.post(VendorPaymentUrl, formData);
  return response;
};

export const VendorPaymentEditApi = async ({ formData, id }: EditRequestType<VendorPaymentType>) => {
  const response = await API.put(VendorPaymentUrl + '/' + id, formData);
  return response;
};

export const VendorPaymentView = async (id?: string) => {
  const response = await API.get(VendorPaymentUrl + '/' + id);
  return response.data as VendorPaymentType;
};
export const VendorPaymentDetailView = async ({ params, url }: { params: PaginationInterFace; url?: string }) => {
  const response = await API.get(VendorPaymentUrl + '/view/' + url, { params });
  return response.data as VendorPaymentResponse;
};
export const VendorPaymentDelete = async (id: string) => {
  const response = await API.delete(VendorPaymentUrl + '/' + id);
  return response;
};
export const VendorPaymentPOView = async (id?: string) => {
  const response = await API.get(VendorPaymentUrl + '/purchase-order/' + id);
  return response.data as VendorPaymentType;
};
