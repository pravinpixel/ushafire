import axios, { AxiosResponse } from "axios";
import { SESSIONANDLOCAL } from "../constants";
import { getLocalStorage } from "./storageConfigs";
import { toast } from "sonner";

const API = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	// baseURL: "http://localhost:3001",
});
let isRefreshing = false;
const TOKEN_PAYLOAD_KEY = "authorization";

const TOKEN = () => getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN);

API.interceptors.request.use(function (config) {
	if (TOKEN()) {
		config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${TOKEN()}`;
	}
	// NGROK IGNORE WARNING
	// config['headers']['ngrok-skip-browser-warning'] = '69420';
	return config;
});

// const refetchToken = async () => {
//   axios({
//     url: process.env.REACT_APP_BASE_API + 'refresh',
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + getLocalStorage(SESSIONANDLOCAL.PROJECT_REFRESH_TOKEN),
//     },
//   })
//     .then((response) => {
//       setLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN, response.data.authorisation.token);
//       setLocalStorage(SESSIONANDLOCAL.PROJECT_NAME_EMPLOYEEID, response.data.user.id);
//       setLocalStorage(SESSIONANDLOCAL.PROJECT_REFRESH_TOKEN, response.data.refreshtoken.refresh_token);
//       window.location.reload();
//     })
//     .catch(() => {
//       unsetLocalStorage();
//       setTimeout(() => {
//         window.location.href = '/auth/login';
//       }, 1000);
//     });
// };

const handleRedirect = () => {
	const errorMessage = {
		success: false,
		message: "Time Out! Kindly Login",
	};

	if (!isRefreshing) {
		isRefreshing = true;
		setTimeout(() => {
			window.location.href = "/auth/login";
		}, 2000);
		// refetchToken();
	}
	return Promise.reject(errorMessage);
};
API.interceptors.response.use(
	// unwrap response data
	({ data, request, headers }) => {
		if (request.responseType === "arraybuffer") {
			//Changing response for download file as bufferData
			return {
				bufferResponse: data,
				type: headers["content-type"] || headers["Content-Type"],
				name: headers["content-disposition"] || headers["Content-Disposition"],
			} as unknown as AxiosResponse
		}
		return data as AxiosResponse
	},

	// catch statusCode != 200 responses and format error
	(error) => {
		if (error?.response) {
			const errorData = {
				...error.response.data,
				bufferResponse: error?.response?.data,
				status: error.response.status,
			} as AxiosResponse['data'];
			if (error.response.status === 401) {
				// const pathToSkip = "login";
				// const url = String(window.location.href).split("/");
				// if (!url.includes(pathToSkip)) {
				// 	unsetLocalStorage();
				// 	handleRedirect();
				// }
				return Promise.reject(errorData);
			}
			if (error.response.status === 403) {
				handleRedirect();
				if (!isRefreshing) {
					isRefreshing = true;
					//   refetchToken();
				}
				return Promise.reject(errorData);
			}
			if (error.response.status === 406) {
				toast.error(errorData?.message||"")
				return Promise.reject(errorData);
			}

			return Promise.reject(errorData);
		}
		return Promise.reject({ message: error?.message });
	}
);

/**
 * This file is part of AutoPack
 *
 * Configuration Api file
 *
 */
export default API;
