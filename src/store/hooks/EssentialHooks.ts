import { useQuery, useMutation } from '@tanstack/react-query';

import { PaginationInterFace } from 'helper/types/TableTypes';
import { notify, printFile, downloadFileExcel } from 'helper/GlobalHelper';

import {
  PrintApi,
  ImportApi,
  DownloadApi,
  GenerateIdApi,
  DashBoardList,
  EssentialLists,
  ExcelSampleApi,
  EssentialSearch,
  GlobalSearchApi,
  NotificationEssential,
} from '../services/EssentialServices';

export const EssentialKey = 'EssentialKey';
export const DashBoardListKey = 'DashBoardListKey';
export const NotificationEssentialKey = 'NotificationEssentialKey';

export const useEssentialList = ({ params }: { params: EssentialReqType }) => {
  return useQuery({
    queryKey: [EssentialKey, params],
    queryFn: () => EssentialLists({ params: params }),
    enabled: params.enabled !== undefined ? params.enabled : !!params?.include?.length,
  });
};

export const useDashBoardList = () => {
  return useQuery({
    queryKey: [DashBoardListKey],
    queryFn: () => DashBoardList(),
  });
};
export const useNotificationEssential = () => {
  return useQuery({
    queryKey: [NotificationEssentialKey],
    queryFn: () => NotificationEssential(),
  });
};
export const useEssentialSearch = () => {
  return useMutation({
    mutationFn: (params: EssentialReqType) => EssentialSearch({ params }),
  });
};

export const useGenerateIdApi = (params: GenerateIdType) => {
  return useQuery({
    queryKey: [params],
    queryFn: () => GenerateIdApi(params),
  });
};
export const useGlobalSearchApi = ({ params }: { params: PaginationInterFace }) => {
  return useQuery({
    queryKey: [params],
    queryFn: () => GlobalSearchApi({ params }),
  });
};
export const useCreateGenerateIdApi = () => {
  return useMutation({
    mutationFn: GenerateIdApi,
  });
};
export const useImportApi = () => {
  return useMutation({
    mutationFn: ImportApi,
  });
};
export const usePrintApi = () => {
  return useMutation({
    mutationFn: PrintApi,
    onSuccess: (res) => {
      printFile(res);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errors = String.fromCharCode.apply(null, new Uint8Array(error?.bufferResponse as unknown as ArrayBufferLike) as unknown as number[]);
      notify(JSON.parse(errors));
    },
  });
};

export const useDownloadApi = () => {
  return useMutation({
    mutationFn: DownloadApi,
    onSuccess: (res) => {
      downloadFileExcel(res, 'Product');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errors = String.fromCharCode.apply(null, new Uint8Array(error?.bufferResponse as unknown as ArrayBufferLike) as unknown as number[]);
      notify(JSON.parse(errors));
    },
  });
};

export const useSampleExcelApi = () => {
  return useMutation({
    mutationFn: ExcelSampleApi,
    onSuccess: (res) => {
      downloadFileExcel(res, 'Product');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errors = String.fromCharCode.apply(null, new Uint8Array(error?.bufferResponse as unknown as ArrayBufferLike) as unknown as number[]);
      notify(JSON.parse(errors));
    },
  });
};
