import { downloadFileExcel } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { StatusType, CreateRequestType } from 'helper/types/GlobalTypes';
import { RoleFormType, PermissionFormType, ConfigurationFormType } from 'helper/types/AdminSettingTypes';

import API from 'configs/AxiosConfig';

type UserFormType = {
  [key: string]: unknown;
  url?: string;
};
// type RoleFormType = {
//     [key: string]: unknown;
//     url?: string;
// };
const userUrl = '/users';
const roleUrl = '/role';
const permissionUrl = '/permission';
const configurationUrl = '/configuration';

//User
export const UserListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(userUrl, { params });
  return response;
};

export const Userview = async (id: string) => {
  const response = await API.get(`${userUrl}/${id}`);
  return response.data;
};

export const UserCreate = async ({ formData }: CreateRequestType<UserFormType>) => {
  const response = await API.post(userUrl, formData);
  return response;
};
export const UserEdit = async ({ formData }: CreateRequestType<UserFormType>) => {
  const response = await API.put(userUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const UserStatusChange = async ({ formData }: CreateRequestType<UserFormType>) => {
  const response = await API.patch(userUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const UserDelete = async (id: string) => {
  const response = await API.delete(userUrl + '/' + id);
  return response;
};

export const UserExport = async ({ formData, url }: { formData?: UserFormType; url: string }) => {
  const response = await API.post(url, formData, {
    responseType: 'arraybuffer',
  });
  await downloadFileExcel(response, formData?.url);
  return response;
};

//Role
export const RoleListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(roleUrl + ``, { params });
  return response;
};

export const RoleView = async (id?: string) => {
  const response = await API.get(roleUrl + '/' + id);
  return response.data as RoleFormType;
};

export const RoleCreate = async ({ formData }: CreateRequestType<RoleFormType>) => {
  const response = await API.post(roleUrl, formData);
  return response;
};

export const RoleEdit = async ({ formData }: CreateRequestType<RoleFormType>) => {
  const response = await API.put(roleUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const RoleStatusChange = async ({ formData }: { formData: StatusType; url?: string }) => {
  const response = await API.patch(roleUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const RoleDelete = async (id: string) => {
  const response = await API.delete(roleUrl + '/' + id);
  return response;
};

export const RoleExport = async ({ formData }: CreateRequestType<RoleFormType>) => {
  const response = await API.post(roleUrl + '/export/excel', formData, {
    responseType: 'arraybuffer',
  });
  await downloadFileExcel(response, 'Roles');
  return response;
};
//Permission
export const PermissionListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(permissionUrl + ``, { params });
  return response;
};

export const PermissionView = async (id?: string) => {
  const response = await API.get(permissionUrl + '/' + id);
  return response.data as PermissionFormType;
};

export const PermissionCreate = async ({ formData }: CreateRequestType<PermissionFormType>) => {
  const response = await API.post(permissionUrl, formData);
  return response;
};

export const PermissionEdit = async ({ formData }: CreateRequestType<PermissionFormType>) => {
  const response = await API.put(permissionUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const PermissionStatusChange = async ({ formData }: { formData: StatusType; url?: string }) => {
  const response = await API.patch(permissionUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const PermissionDelete = async (id: string) => {
  const response = await API.delete(permissionUrl + '/' + id);
  return response;
};

export const PermissionExport = async ({ formData }: CreateRequestType<PermissionFormType>) => {
  const response = await API.post(permissionUrl + '/export/excel', formData, {
    responseType: 'arraybuffer',
  });
  await downloadFileExcel(response, 'Permissions');
  return response;
};

/** Configuration*/
export const ConfigurationListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(configurationUrl + ``, { params });
  return response;
};

export const ConfigurationView = async (id?: string) => {
  const response = await API.get(configurationUrl + '/' + id);
  return response.data as ConfigurationFormType;
};

export const ConfigurationCreate = async ({ formData }: CreateRequestType<ConfigurationFormType>) => {
  const response = await API.post(configurationUrl, formData);
  return response;
};

export const ConfigurationEdit = async ({ formData }: CreateRequestType<ConfigurationFormType>) => {
  const response = await API.put(configurationUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const ConfigurationStatusChange = async ({ formData }: { formData: StatusType; url?: string }) => {
  const response = await API.patch(configurationUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const ConfigurationDelete = async (id: string) => {
  const response = await API.delete(configurationUrl + '/' + id);
  return response;
};
