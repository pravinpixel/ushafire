import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';

import * as IMAPI from 'store/services/InventoryManagementService';

export const ProductListKey = 'ProductList';
export const StockLevelListKey = 'StockLevelList';
export const ProductHistoryKey = 'ProductHistory';
export const WareHouseWiseKey = 'WareHouseWiseList';
export const BarcodeListsKey = 'BarcodeLists';
export const StockOutwardListsKey = 'StockOutwardList';
export const StockInwardListsKey = 'StockInwardList';
export const ProductInwardListsKey = 'ProductInwardList';
export const ProductOutwardListsKey = 'ProductOutwardList';

export const useProductListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [ProductListKey, params],
    queryFn: () => IMAPI.ProductListApi({ params }),
  });
};

export const useProductCreate = () => {
  return useMutation({
    mutationFn: IMAPI.ProductCreate,
  });
};

export const useProductEdit = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: IMAPI.ProductEdit,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [ProductListKey] });
    },
  });
};

export const useProductView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => IMAPI.ProductView(url),
  });
};

export const useProductHistoryApi = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => IMAPI.ProductViewPriceHistory(url),
  });
};

export const useProductDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: IMAPI.ProductDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [ProductListKey] });
    },
  });
};

export const useStockLevelListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [StockLevelListKey, params],
    queryFn: () => IMAPI.StockLevelListApi({ params }),
  });
};

export const useWareHouseWiseView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => IMAPI.WareHouseWiseView(url),
  });
};

export const useWareHouseWiseCreate = () => {
  return useMutation({
    mutationFn: IMAPI.WareHouseWiseCreateApi,
  });
};
export const useWareHouseWiseEdit = () => {
  return useMutation({
    mutationFn: IMAPI.WareHouseWiseEditApi,
  });
};

export const useWarehouseWiseListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [WareHouseWiseKey, params],
    queryFn: () => IMAPI.WarehouseListApi({ params }),
  });
};

export const useWareHouseWiseDelete = () => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: IMAPI.WarehouseDelete,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: [WareHouseWiseKey] });
    },
  });
};

export const useBarcodeListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [BarcodeListsKey, params],
    queryFn: () => IMAPI.BarcodeListsApi({ params }),
  });
};

export const useBarcodeCreate = () => {
  return useMutation({
    mutationFn: IMAPI.BarcodeCreate,
  });
};
export const useBarcodeEdit = () => {
  return useMutation({
    mutationFn: IMAPI.BarcodeEdit,
  });
};

export const useBarcodeDelete = () => {
  return useMutation({
    mutationFn: IMAPI.BarcodeDelete,
  });
};

export const useBarcodeView = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => IMAPI.BarcodeView(url),
  });
};

export const useStockOutwardListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [StockOutwardListsKey, params],
    queryFn: () => IMAPI.StockOutwardListApi({ params }),
  });
};

export const useStockOutwardCreate = () => {
  return useMutation({
    mutationFn: IMAPI.StockOutwardCreateApi,
  });
};

export const useStockOutwardEdit = () => {
  return useMutation({
    mutationFn: IMAPI.StockOutwardEditApi,
  });
};

export const useStockOutwaedView = (url?: string, params?: { view?: string }) => {
  return useQuery({
    queryKey: [StockOutwardListsKey + url, params],
    queryFn: () => IMAPI.StockOutwaedView(url, params),
  });
};
export const useStockOutwardUpdateQtyView = (id?: string) => {
  return useQuery({
    queryKey: [StockOutwardListsKey + id],
    queryFn: () => IMAPI.StockOutwardWithdrawQtyView(id),
  });
};
export const useStockInwardDelete = () => {
  return useMutation({
    mutationFn: IMAPI.StockInwardDelete,
  });
};

// export const useStockInwardPOView = (url?: string) => {
//   return useQuery({
//     queryKey: [StockOutwardListsKey + url],
//     queryFn: () => IMAPI.StockInwardPOView(url),
//     enabled: !!url,
//   });
// };

export const useStockInWarehouseProduct = () => {
  return useMutation({
    mutationFn: IMAPI.StockInWarehouseProduct,
  });
};
export const useStockInwardListApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [StockInwardListsKey, params],
    queryFn: () => IMAPI.StockInwardListApi({ params }),
  });
};

export const useStockInwardCreate = () => {
  return useMutation({
    mutationFn: IMAPI.StockInwardCreateApi,
  });
};

export const useStockInwardEdit = () => {
  return useMutation({
    mutationFn: IMAPI.StockInwardEditApi,
  });
};
export const useStockInwaedView = (url?: string, params?: { view?: string }) => {
  return useQuery({
    queryKey: [StockInwardListsKey + url, params],
    queryFn: () => IMAPI.StockInwaedView(url, params),
    enabled: !!url,
  });
};

export const useStockInwaedUpdateQtyView = (id?: string) => {
  return useQuery({
    queryKey: [StockInwardListsKey + id],
    queryFn: () => IMAPI.StockInwaedUpdateQtyView(id),
  });
};
export const useWarehouseProductBRSBDetails = () => {
  return useMutation({
    mutationFn: IMAPI.WarehouseProductBRSBDetails,
  });
};
export const useProductInInwardList = ({ params, id }: { params: PaginationInterFace; id?: string }) => {
  return useQuery({
    queryKey: [ProductInwardListsKey + id, params],
    queryFn: () => IMAPI.ProductInInwardListApi({ params, id }),
  });
};
export const useProductInOutwardList = ({ params, id }: { params: PaginationInterFace; id?: string }) => {
  return useQuery({
    queryKey: [ProductOutwardListsKey + id, params],
    queryFn: () => IMAPI.ProductInOutwardListApi({ params, id }),
  });
};
