import { MasterForm } from 'helper/types/MasterType';
import { downloadFileExcel } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import API from 'configs/AxiosConfig';

const MasterLists = async ({ params, url }: { params: PaginationInterFace; url: string }) => {
  const response = await API.get(url, { params });
  return response.data;
};

const MasterView = async (url: string) => {
  const response = await API.get(url);
  return response.data;
};

const MasterCreate = async ({ formData, url, method = 'post' }: { formData: MasterForm; url: string; method: 'post' | 'postForm' }) => {
  const response = await API[method](url, formData);
  return response;
};

const MasterEdit = async ({ formData, url, method = 'put' }: { formData: MasterForm; url: string; method: 'put' | 'putForm' }) => {
  const response = await API[method](url, formData);
  return { ...response, url };
};

const MasterStatusChange = async ({ formData, url }: { formData?: MasterForm; url: string }) => {
  const response = await API.patch(url, formData);
  return { ...response, url };
};

const MasterDelete = async (id: string) => {
  const response = await API.delete(id);
  return response;
};

const MasterExport = async ({ formData, url }: { formData?: MasterForm; url: string }) => {
  const response = await API.post(url, formData, {
    responseType: 'arraybuffer',
  });
  await downloadFileExcel(response, formData?.url);
  return response;
};

const MasterImport = async ({ formData, url }: { formData: { import_excel: File; url: string }; url: string }) => {
  const response = await API.postForm(url, formData);
  return { ...response, url: formData.url };
};

export { MasterEdit, MasterView, MasterLists, MasterImport, MasterCreate, MasterExport, MasterDelete, MasterStatusChange };
