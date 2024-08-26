import { PaginationInterFace } from 'helper/types/TableTypes';
import { EditRequestType, CreateRequestType } from 'helper/types/GlobalTypes';
import { BarcodeTypeForm } from 'helper/types/inventory-management/BarcodeType';
import { WareHouseWiseFormType } from 'helper/types/inventory-management/WareHouseWise';
import { ProductFormType, ProductListResponse } from 'helper/types/inventory-management/ProductInventoryType';
import { StockInwardTypeForm, StockInwaedUpdateQtyViewType } from 'helper/types/inventory-management/StockInwardType';
import { StockOutwardTypeForm, StockOutwardUpdateQtyViewType } from 'helper/types/inventory-management/StockOutwardType';

import API from 'configs/AxiosConfig';

const ProductUrl = '/product';
const BarcodeUrl = '/barcode';
// const StockInwardPOUrl = '/essential';
const StockInwardUrl = '/stock-inward';
const StockOutwardUrl = '/stock-outward';
const StockLevelUrl = '/stocklevel-indicator';
const WareHouseWiseUrl = '/warehouse-wise-stock';
const StockInwardDraftUrl = '/stock-inward/draft';
const StockOutwardDraftUrl = '/stock-outward/draft';
const StockInWareHouseProduct = 'stock-inward/purchaseorder/';
const ProductStockInWardListUrl = '/product/productInInwardList/';
const ProductStockOutWardListUrl = '/product/productInOutwardList/';

export const ProductListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(ProductUrl, { params });
  return response.data;
};

export const ProductCreate = async ({ formData }: CreateRequestType<ProductFormType>) => {
  const response = await API.postForm(ProductUrl, formData);
  return response;
};
export const ProductEdit = async ({ formData }: EditRequestType<ProductFormType>) => {
  const response = await API.putForm(ProductUrl + '/' + formData?._id, formData);
  return { url: formData?._id, ...response };
};

export const ProductDelete = async (id: string) => {
  const response = await API.delete(ProductUrl + '/' + id);
  return response;
};

export const ProductView = async (id?: string) => {
  const response = await API.get(ProductUrl + '/' + id);
  return response.data as ProductFormType;
};
export const ProductViewPriceHistory = async (id?: string) => {
  const response = await API.get(ProductUrl + '/history/' + id);
  return response.data as ProductListResponse;
};

export const StockLevelListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(StockLevelUrl, { params });
  return response.data;
};

export const WareHouseWiseView = async (id?: string) => {
  const response = await API.get(WareHouseWiseUrl + '/' + id);
  return response.data as WareHouseWiseFormType;
};
export const WareHouseWiseCreateApi = async ({ formData }: CreateRequestType<WareHouseWiseFormType>) => {
  const response = await API.post(WareHouseWiseUrl, formData);
  return response;
};

export const WareHouseWiseEditApi = async ({ formData, id }: EditRequestType<WareHouseWiseFormType>) => {
  const response = await API.put(WareHouseWiseUrl + '/' + id, formData);
  return response;
};

export const WarehouseListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(WareHouseWiseUrl, { params });
  return response.data;
};

export const WarehouseDelete = async (id: string) => {
  const response = await API.delete(WareHouseWiseUrl + '/' + id);
  return response;
};

export const BarcodeListsApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(BarcodeUrl, { params });
  return response;
};

export const BarcodeCreate = async ({ formData }: CreateRequestType<BarcodeTypeForm>) => {
  const response = await API.post(BarcodeUrl, formData);
  return response;
};

export const BarcodeEdit = async ({ formData, id }: EditRequestType<BarcodeTypeForm>) => {
  const response = await API.put(BarcodeUrl + '/' + id, formData);
  return response;
};

export const BarcodeDelete = async (id: string) => {
  const response = await API.delete(BarcodeUrl + '/' + id);
  return response;
};

export const BarcodeView = async (id?: string) => {
  const response = await API.get(BarcodeUrl + '/' + id);
  return response.data as BarcodeTypeForm;
};

export const StockOutwardListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(StockOutwardUrl, { params });
  return response.data;
};

export const StockOutwardCreateApi = async ({ formData }: CreateRequestType<StockOutwardTypeForm>) => {
  const response = await API.post(formData?.draft ? StockOutwardDraftUrl : StockOutwardUrl, formData);
  return response;
};

export const StockOutwardEditApi = async ({ formData, id }: EditRequestType<StockOutwardTypeForm>) => {
  const response = await API.put((formData?.draft ? StockOutwardDraftUrl : StockOutwardUrl) + '/' + id, formData);
  return response;
};

export const StockOutwaedView = async (id?: string, params?: { view?: string }) => {
  const response = await API.get(StockOutwardUrl + '/' + id, { params });
  return response.data as StockOutwardTypeForm;
};

export const StockOutwardWithdrawQtyView = async (id?: string) => {
  const response = await API.get(StockOutwardUrl + '/report/' + id);
  return response.data as StockOutwardUpdateQtyViewType;
};

export const StockInwardListApi = async ({ params }: { params: PaginationInterFace }) => {
  const response = await API.get(StockInwardUrl, { params });
  return response.data;
};

export const StockInwardCreateApi = async ({ formData }: CreateRequestType<StockInwardTypeForm>) => {
  const response = await API.postForm(formData.draft ? StockInwardDraftUrl : StockInwardUrl, formData);
  return response;
};

export const StockInwardEditApi = async ({ formData, id }: EditRequestType<StockInwardTypeForm>) => {
  const response = await API.putForm((formData.draft ? StockInwardDraftUrl + '/' : StockInwardUrl + '/') + id, formData);
  return response;
};

export const StockInwaedView = async (id?: string, params?: { view?: string }) => {
  const response = await API.get(StockInwardUrl + '/' + id, { params });
  return response.data as StockInwardTypeForm;
};

export const StockInwaedUpdateQtyView = async (id?: string) => {
  const response = await API.get(StockInwardUrl + '/report/' + id);
  return response.data as StockInwaedUpdateQtyViewType;
};
// export const StockInwardPOView = async (id?: string) => {
//   const response = await API.get(StockInwardPOUrl, {
//     params: {
//       include: ['po-to-inward'],
//       poId: id,
//     },
//   });
//   return response.data;
// };
export const StockInwardDelete = async (url: string) => {
  const response = await API.delete(StockInwardUrl + '/' + url);
  return response;
};
export const StockInWarehouseProduct = async ({ id, warehouseId }: { id: string; warehouseId: string }) => {
  const response = await API.get(StockInWareHouseProduct + id + '/warehouse/' + warehouseId);
  return response.data;
};

export const WarehouseProductBRSBDetails = async ({ id, warehouseId }: { id: string; warehouseId: string }) => {
  const response = await API.get(WareHouseWiseUrl + ProductUrl + '/' + id + '/warehouse/' + warehouseId);
  return response.data;
};

export const ProductInInwardListApi = async ({ params, id }: { params: PaginationInterFace; id?: string }) => {
  const response = await API.get(ProductStockInWardListUrl + id, { params });
  return response.data;
};

export const ProductInOutwardListApi = async ({ params, id }: { params: PaginationInterFace; id?: string }) => {
  const response = await API.get(ProductStockOutWardListUrl + id, { params });
  return response.data;
};
