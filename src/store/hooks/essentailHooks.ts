import { useQuery } from "react-query";
import { GetApi } from "../services";
import { taskUrl } from "./taskHooks";
export const essentialUrl = "/essential";

export const useEssentailApi = (params: EssentailParams) => {
	return useQuery({
		queryFn: () =>
			GetApi<EssentailTypeList, EssentailParams>({
				url: taskUrl + essentialUrl,
				params,
			}),
		queryKey: [essentialUrl, params],
		enabled: params?.keys?.length > 0,
	});
};
