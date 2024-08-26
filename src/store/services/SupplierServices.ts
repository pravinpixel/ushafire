import { CreateRequestType } from 'helper/types/GlobalTypes';
import { SupplierTypeForm } from 'helper/types/SupplierTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';

import API from 'configs/AxiosConfig';

type SupplierFormType = {
  [key: string]: unknown;
  url?: string;
};

const supplierUrl = '/supplier';

export const SupplierListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(supplierUrl, { params });
  return response;
};

export const SupplierCreate = async ({ formData }: CreateRequestType<SupplierFormType>) => {
  const response = await API.post(supplierUrl, formData);
  return response;
};

export const SupplierEdit = async ({ formData }: { formData: SupplierFormType }) => {
  const response = await API.put(supplierUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const supplierDelete = async (id: string) => {
  const response = await API.delete(supplierUrl + '/' + id);
  return response;
};

export const supplierView = async (id?: string) => {
  const response = await API.get(supplierUrl + '/' + id);
  return response.data as SupplierTypeForm;
};
