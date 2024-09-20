import { AxiosResponse } from "axios";
import API from "../../utils/helpers/axiosConfig";

type ApiTypes<R> = {
	url: string;
	params?: R;
	formData?: R;
};

type CustomResponse<T> = AxiosResponse<T>;

export const GetApi = async <T, R = unknown>({ url, params }: ApiTypes<R>): Promise<CustomResponse<T>> => {
	return await API.get(url, {
		params,
	});
};

export const PutApi = async <R = unknown>({ url, formData }: ApiTypes<R>): Promise<CustomResponse<R>> => {
	return await API.put(url, formData);
};

export const PostApi = async <R = unknown>({ url, formData }: ApiTypes<R>): Promise<CustomResponse<R>> => {
	return await API.post(url, formData);
};

export const DeleteApi = async <T, R = unknown>({ url }: ApiTypes<R>): Promise<CustomResponse<T>> => {
	return await API.delete(url);
};

export const PutFormApi = async <R = unknown>({ url, formData }: ApiTypes<R>): Promise<CustomResponse<R>> => {
	return await API.putForm(url, formData);
};

export const PostFormApi = async <R = unknown>({ url, formData }: ApiTypes<R>): Promise<CustomResponse<R>> => {
	return await API.postForm(url, formData);
};
