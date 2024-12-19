export const taskUrl = "/task";
export const taskComment = "/task-comment";
export const taskViewKey = "taskView";
export const downloadUrl = "/export";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteApi, GetApi, PostApi, PostFormApi } from "../services";
import { loginUrl } from "./authHooks";
import { downloadFileExcel, notify } from "../../utils/helpers/globalHelper";

export const useTaskCreate = () => {
  const refecthQuery = useQueryClient();
  return useMutation({
    mutationFn: async (formData: TaskFormType) =>
      await PostFormApi<TaskFormType>({ url: taskUrl + "/save", formData }),
    onSuccess: () => {
      refecthQuery.refetchQueries([taskUrl]);
    },
  });
};

export const useTaskUpdate = () => {
  const refecthQuery = useQueryClient();
  return useMutation({
    mutationFn: async (formData: TaskFormType) =>
      await PostFormApi({ url: taskUrl + "/update/" + formData?.id, formData }),
    onSuccess: (res) => {
      refecthQuery.refetchQueries([taskUrl, res?.data?.id]);
      refecthQuery.refetchQueries([taskUrl]);
    },
  });
};

export const useTaskDelete = () => {
  const refecthQuery = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      await DeleteApi({ url: taskUrl + "/delete/" + id }),
    onSuccess: () => {
      refecthQuery.refetchQueries([taskUrl]);
    },
  });
};

export const useTaskList = (params?: TaskPagination) => {
  const refecthQuery = useQueryClient();
  return useQuery({
    queryFn: async () =>
      await GetApi<PaginationResponse<TaskFormType[]>, TaskPagination>({
        url: taskUrl + "/",
        params,
      }),
    queryKey: [taskUrl, params],
    onSuccess: () => {
      if (params?.tab === "my_task") {
        refecthQuery.refetchQueries([loginUrl]);
      }
    },
  });
};

export const useTaskListView = (id?: string | null) => {
  return useQuery({
    queryFn: async () =>
      await GetApi<TaskFormType>({ url: taskUrl + "/view" + `/${id}` }),
    queryKey: [taskViewKey, String(id)],
    enabled: !!id,
  });
};

export const useStatusUpdate = (id?: string | null) => {
  const refecthQuery = useQueryClient();
  return useMutation({
    mutationFn: async (formData: TaskFormType) =>
      await PostApi<TaskFormType>({
        url: taskUrl + "/statusupdate" + `/${id}`,
        formData,
      }),
    onSuccess: (res) => {
      refecthQuery.refetchQueries([taskViewKey, String(res?.data?.id)]);
      refecthQuery.refetchQueries({
        queryKey: [taskUrl],
      });
    },
  });
};

export const useSaveComment = () => {
  const refecthQuery = useQueryClient();
  return useMutation({
    mutationFn: async (formData: TaskComment) =>
      await PostFormApi<TaskComment>({ url: taskComment + "/save", formData }),
    onSuccess: (res) => {
      refecthQuery.refetchQueries({
        queryKey: [taskViewKey, String(res.data.task_id)],
      });
      refecthQuery.refetchQueries({
        queryKey: [taskUrl],
      });
    },
  });
};

export const useCloseTask = () => {
  const refecthQuery = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      PostApi<TaskFormType>({ url: taskUrl + "/taskclose" + `/${id}` }),
    onSuccess: (res) => {
      refecthQuery.refetchQueries([taskViewKey, String(res.data.id)]);
      refecthQuery.refetchQueries({
        queryKey: [taskUrl],
      });
    },
  });
};

export const useTaskDownload = (url?: string) => {
  return useMutation({
    mutationFn: async () =>{
		const responseType = 'arraybuffer';
      return await GetApi<TaskFormType>({ url: downloadUrl + `/${url}`, responseType})},
    onSuccess: (res) => {
    
      downloadFileExcel(res,url);
    },
    onError: (error: any) => {
      const errors = String.fromCharCode.apply(
        null,
        new Uint8Array(
          error?.bufferResponse as unknown as ArrayBufferLike
        ) as unknown as number[]
      );
      notify(JSON.parse(errors));
    },
  });
};
