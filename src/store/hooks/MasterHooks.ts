import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';

import { EssentialKey } from './EssentialHooks';
import {
  MasterEdit,
  MasterView,
  MasterLists,
  MasterCreate,
  MasterExport,
  MasterDelete,
  MasterImport,
  MasterStatusChange,
} from '../services/MasterServices';

// ---------------------------------------------------------------------------

export const useMasterList = ({ params, url }: { params: PaginationInterFace; url: string }) => {
  return useQuery({
    queryKey: [url, params], // like country/department ..etc
    queryFn: () => MasterLists({ params: params, url: url }),
  });
};

export const useMasterCreate = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: MasterCreate,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [EssentialKey] });
    },
  });
};

export const useMasterEdit = () => {
  return useMutation({
    mutationFn: MasterEdit,
  });
};

export const useMasterExport = () => {
  return useMutation({ mutationFn: MasterExport });
};

export const useMasterImport = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: MasterImport,
    onSuccess: (res) => {
      refetch.refetchQueries({ queryKey: [res.url] });
    },
  });
};
export const useMasterStatusChange = () => {
  return useMutation({
    mutationFn: MasterStatusChange,
  });
};

export const useMasterDelete = () => {
  return useMutation({
    mutationFn: MasterDelete,
  });
};

export const useMasterView = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => MasterView(url),
  });
};
