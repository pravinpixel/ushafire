import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';

import {
  UserEdit,
  Userview,
  RoleEdit,
  RoleView,
  UserCreate,
  UserExport,
  UserDelete,
  RoleCreate,
  RoleExport,
  RoleDelete,
  RoleListsApi,
  UserListsApi,
  PermissionEdit,
  PermissionView,
  UserStatusChange,
  RoleStatusChange,
  PermissionCreate,
  PermissionExport,
  PermissionDelete,
  ConfigurationEdit,
  ConfigurationView,
  PermissionListsApi,
  ConfigurationCreate,
  ConfigurationDelete,
  ConfigurationListsApi,
  PermissionStatusChange,
  ConfigurationStatusChange,
} from '../services/SettingService';

export const UserListKey = 'UserLists';
export const RoleListKey = 'RoleLists';
export const ConfigurationListKey = 'ConfifurationLists';

//User
export const useUserListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [UserListKey, params],
    queryFn: () => UserListsApi({ params }),
  });
};

export const useUserCreate = () => {
  return useMutation({
    mutationFn: UserCreate,
  });
};

export const useUserEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: UserEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [UserListKey] });
    },
  });
};

export const useUserExport = () => {
  return useMutation({ mutationFn: UserExport });
};

export const useUserStatusChange = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: UserStatusChange,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [UserListKey] });
    },
  });
};

export const useUserDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: UserDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [UserListKey] });
    },
  });
};

export const useUserView = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => Userview(url),
  });
};

//Role
export const useRoleListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [RoleListKey, params],
    queryFn: () => RoleListsApi({ params }),
  });
};

export const useRoleCreate = () => {
  return useMutation({
    mutationFn: RoleCreate,
  });
};

export const useRoleEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: RoleEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [RoleListKey] });
    },
  });
};

export const useRoleExport = () => {
  return useMutation({ mutationFn: RoleExport });
};

export const useRoleStatusChange = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: RoleStatusChange,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [RoleListKey] });
    },
  });
};

export const useRoleDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: RoleDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [RoleListKey] });
    },
  });
};

export const useRoleView = (url?: string, enabled?: boolean) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => RoleView(url),
    enabled: enabled ?? true,
  });
};

//Permission
export const usePermissionListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: ['PermissionLists', params],
    queryFn: () => PermissionListsApi({ params }),
  });
};

export const usePermissionCreate = () => {
  return useMutation({
    mutationFn: PermissionCreate,
  });
};

export const usePermissionEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: PermissionEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['PermissionLists'] });
    },
  });
};

export const usePermissionExport = () => {
  return useMutation({ mutationFn: PermissionExport });
};

export const usePermissionStatusChange = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: PermissionStatusChange,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['PermissionLists'] });
    },
  });
};

export const usePermissionDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: PermissionDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ['PermissionLists'] });
    },
  });
};

export const usePermissionView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => PermissionView(url),
  });
};

// Configuration

export const useConfigurationListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [ConfigurationListKey, params],
    queryFn: () => ConfigurationListsApi({ params }),
  });
};

export const useConfigurationCreate = () => {
  return useMutation({
    mutationFn: ConfigurationCreate,
  });
};

export const useConfigurationEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ConfigurationEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [ConfigurationListKey] });
    },
  });
};

export const useConfigurationStatusChange = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ConfigurationStatusChange,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [ConfigurationListKey] });
    },
  });
};

export const useConfigurationDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: ConfigurationDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [ConfigurationListKey] });
    },
  });
};

export const useConfigurationView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => ConfigurationView(url),
  });
};
