import { PaginationInterFace } from 'helper/types/TableTypes';
import { DashBoardListDataType } from 'helper/types/DashBoardType';

import API from 'configs/AxiosConfig';

const GlobalSearch = '/globalSearch';

export const EssentialLists = async ({ params }: { params: EssentialReqType }) => {
  const response = await API.get('essential', { params });
  return response.data as EssentialDataType;
};
export const EssentialSearch = async ({ params }: { params: EssentialReqType }) => {
  const response = await API.get('essential', { params });
  return response.data as EssentialDataType;
};

export const GenerateIdApi = async (params: GenerateIdType) => {
  const response = await API.get('generate_id', { params });
  return response.data as GenrateCodeType;
};

export const ImportApi = async ({ formData, url }: { formData: { import_excel: File; defaultImportValue?: unknown }; url: ImportUrls }) => {
  const response = await API.postForm(url + '/excel/upload', formData);
  return response.data;
};

export const PrintApi = async ({ type = 'barcode', id }: { type?: string; id?: string }) => {
  const response = await API.get(`${type}/getPdf/${id}`, {
    responseType: 'arraybuffer',
  });
  return response;
};

export const DownloadApi = async ({ type = 'product', id }: { type?: string; id?: string }) => {
  const response = await API.get(`${type}/download/${id}`, {
    responseType: 'arraybuffer',
  });
  return response;
};

export const ExcelSampleApi = async ({ url }: { url: ImportUrls }) => {
  const response = await API.get(url + `/excel-template/download`, {
    responseType: 'arraybuffer',
  });
  return response;
};

export const GlobalSearchApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(GlobalSearch, { params });
  return response.data;
};

export const DashBoardList = async () => {
  const response = await API.get('/dashboard');
  return response.data as DashBoardListDataType;
};
export const NotificationEssential = async () => {
  const response = await API.get('/notification');
  return response.data;
};
