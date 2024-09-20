import { useMutation, useQuery } from "react-query";
import { GetApi, PostApi } from "../services";
import { AxiosResponse } from "axios";

export const loginUrl = "/auth";

export const useLoginApi = () => {
	return useMutation({
		mutationFn: (formData: LoginType) => PostApi<LoginType>({ url: loginUrl + "/login", formData }) as unknown as Promise<AxiosResponse<UserDateType>> ,
	});
};

export const useGetMeApi = () => {
	return useQuery({
		queryFn: () => GetApi<LoginType>({ url: loginUrl + "/me" }),
		queryKey: [loginUrl],
	});
};

export const useLogoutApi = () => {
	return useMutation({
		mutationFn: () => PostApi({ url: loginUrl + "/logout" }),
	});
};

export const useSendMailApi = () => {
	return useMutation({
		mutationFn: (formData: ForgotPassword) => PostApi({ url: loginUrl + "/forget-password", formData }),
	});
};

export const useVerifyOtpApi = () => {
	return useMutation({
		mutationFn: (formData: ForgotPassword) => PostApi({ url: loginUrl + "/verify-code", formData }),
	});
};

export const usePasswordResetApi = () => {
	return useMutation({
		mutationFn: (formData: ForgotPassword) => PostApi({ url: loginUrl + "/reset-password", formData }),
	});
};


export const useChangePasswordApi = () => {
	return useMutation({
		mutationFn: (formData : ChangePassword) => PostApi({ url: loginUrl + "/change-password", formData}),
	});
};
