import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';

import { SupplierEdit, supplierView, SupplierCreate, supplierDelete, SupplierListsApi } from '../services/SupplierServices';

export const useSupplierListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: ['SupplierLists', params],
    queryFn: () => SupplierListsApi({ params }),
  });
};

export const useSupplierCreate = () => {
  return useMutation({
    mutationFn: SupplierCreate,
  });
};

export const useSupplierEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: SupplierEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['SupplierLists'] });
    },
  });
};

export const useSupplierView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => supplierView(url),
  });
};

export const useSupplierDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: supplierDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['SupplierLists'] });
    },
  });
};
