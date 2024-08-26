import { downloadFileExcel } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { StatusType, CreateRequestType } from 'helper/types/GlobalTypes';
import { ChildModuleFormType, ParentModuleFormType } from 'helper/types/AdminSettingTypes';

import API from 'configs/AxiosConfig';

// type ParentModulesFormType = {
//     [key: string]: unknown;
//     url?: string;
// };
// type ChildModuleFormType = {
//     [key: string]: unknown;
//     url?: string;
// };
const parentModuleUrl = '/parent-module';
const childModuleUrl = '/child-module';

//ParentModule
export const ParentModuleListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(parentModuleUrl + ``, { params });
  return response;
};

export const ParentModuleview = async (id?: string) => {
  const response = await API.get(parentModuleUrl + '/' + id);
  return response.data as ChildModuleFormType;
};

export const ParentModuleCreate = async ({ formData }: CreateRequestType<ParentModuleFormType>) => {
  const response = await API.post(parentModuleUrl, formData);
  return response;
};

export const ParentModuleEdit = async ({ formData }: CreateRequestType<ParentModuleFormType>) => {
  const response = await API.put(parentModuleUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const ParentModuleStatusChange = async ({ formData }: { formData: StatusType; url?: string }) => {
  const response = await API.patch(parentModuleUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const ParentModuleDelete = async (id: string) => {
  const response = await API.delete(parentModuleUrl + '/' + id);
  return response;
};

export const ParentModuleExport = async ({ formData }: CreateRequestType<ParentModuleFormType>) => {
  const response = await API.post(parentModuleUrl + '/export/excel', formData, {
    responseType: 'arraybuffer',
  });
  await downloadFileExcel(response, 'ParentModules');
  return response;
};

//ChildModule
export const ChildModuleListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(childModuleUrl, { params });
  return response;
};

export const ChildModuleView = async (id?: string) => {
  const response = await API.get(childModuleUrl + '/' + id);
  return response.data as ChildModuleFormType;
};

export const ChildModuleCreate = async ({ formData }: CreateRequestType<ChildModuleFormType>) => {
  const response = await API.post(childModuleUrl, formData);
  return response;
};

export const ChildModuleEdit = async ({ formData }: CreateRequestType<ChildModuleFormType>) => {
  const response = await API.put(childModuleUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const ChildModuleStatusChange = async ({ formData }: { formData: StatusType; url?: string }) => {
  const response = await API.patch(childModuleUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const ChildModuleDelete = async (id: string) => {
  const response = await API.delete(childModuleUrl + '/' + id);
  return response;
};

export const ChildModuleExport = async ({ formData }: CreateRequestType<ChildModuleFormType>) => {
  const response = await API.post(childModuleUrl + '/export/excel', formData, {
    responseType: 'arraybuffer',
  });
  await downloadFileExcel(response, 'ChildModules');
  return response;
};
