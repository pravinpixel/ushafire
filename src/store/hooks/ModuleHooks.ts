import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';

import {
  ChildModuleEdit,
  ChildModuleView,
  ParentModuleEdit,
  ParentModuleview,
  ChildModuleCreate,
  ChildModuleExport,
  ChildModuleDelete,
  ParentModuleCreate,
  ParentModuleExport,
  ParentModuleDelete,
  ChildModuleListsApi,
  ParentModuleListsApi,
  ChildModuleStatusChange,
  ParentModuleStatusChange,
} from '../services/ModuleServices';

//ParentModule
export const useParentModuleListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: ['ParentModuleLists', params],
    queryFn: () => ParentModuleListsApi({ params }),
  });
};

export const useParentModuleCreate = () => {
  return useMutation({
    mutationFn: ParentModuleCreate,
  });
};

export const useParentModuleEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ParentModuleEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['ParentModuleLists'] });
    },
  });
};

export const useParentModuleExport = () => {
  return useMutation({ mutationFn: ParentModuleExport });
};

export const useParentModuleStatusChange = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ParentModuleStatusChange,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['ParentModuleLists'] });
    },
  });
};

export const useParentModuleDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ParentModuleDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['ParentModuleLists'] });
    },
  });
};

export const useParentModuleView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => ParentModuleview(url),
  });
};

//ChildModule
export const useChildModuleListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: ['ChildModuleLists', params],
    queryFn: () => ChildModuleListsApi({ params }),
  });
};

export const useChildModuleCreate = () => {
  return useMutation({
    mutationFn: ChildModuleCreate,
  });
};

export const useChildModuleEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ChildModuleEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['ChildModuleLists'] });
    },
  });
};

export const useChildModuleExport = () => {
  return useMutation({ mutationFn: ChildModuleExport });
};

export const useChildModuleStatusChange = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ChildModuleStatusChange,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['ChildModuleLists'] });
    },
  });
};

export const useChildModuleDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ChildModuleDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['ChildModuleLists'] });
    },
  });
};

export const useChildModuleView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => ChildModuleView(url),
  });
};
