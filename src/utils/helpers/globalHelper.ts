import dayjs from "dayjs";
import { toast, ExternalToast } from "sonner";

const allowedTypes = {
	".txt": "text/plain",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".xls": "application/vnd.ms-excel",
	".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	".pdf": "application/pdf",
};

export const uploadAccecpt = Object.entries(allowedTypes)
	.map(([key]) => key)
	.join(",");

export const uploadValidation = Object.entries(allowedTypes).map(([, value]) => value);

export const InitialPagination : TaskPagination = {
	page: 1,
	per_page: 20,
	tab: "my_task",
	search: null,
	priority_id: [],
	deadline: [],
	sort_column : null,
}


export const statusArray = ["completed", "deleted", "closed", "Completed", "Deleted", "Closed"];

export const getFileExtension = (fileName: string) => {
	return String(fileName)?.split(".")?.slice(-1)?.[0] || "";
};

export const uploadValidationFile = (files: DocumentsType[]) => {
	const validFiles: DocumentsType[] = [];
	const invalidTypeFiles = [];
	const inValidSizeFile = [] 
	const max = 2
	files?.forEach((file)=>{
		if(file?.id) {
			validFiles.push(file)
		}else {
			const size = file.size / 1024 / 1024;
			if(!uploadValidation?.includes(file.type)) {
				invalidTypeFiles.push(file)
			}
			if(size > max){
				inValidSizeFile.push(file)
			}
			if(uploadValidation?.includes(file.type) && size < max) {
				validFiles.push(file)
			}
		}
	})

	if (invalidTypeFiles?.length > 0) {
		toast.error("Accepted file type are " + uploadAccecpt + "");
	}
	if (inValidSizeFile?.length > 0) {
		toast.error("Max allowed 2MB");
	}
	return validFiles;
};

export const dateValue = (date: Date) => dayjs(date).format("DD");
export const dayValue = (date: Date) => dayjs(date).format("MMM").toLocaleUpperCase();

export const hexToRgba = (hex: string, opacity: number) => {
	let r = 0,
		g = 0,
		b = 0;
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 7) {
		r = parseInt(hex[1] + hex[2], 16);
		g = parseInt(hex[3] + hex[4], 16);
		b = parseInt(hex[5] + hex[6], 16);
	}
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
export function remToPx(value: number) {
	return `${Math.round(value * 16)}px`;
}

export function pxToRem(value: number) {
	return `${value / 16}rem`;
}

export const toastConfig: (position?: ToastPosition) => ExternalToast | undefined = (position = "bottom-right") => ({
	position,
	duration: 4000,
});

export function notify({ error, message = "Something went wrong!", success }: NotifyType) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const errorObj: any = error || message;

	switch (success) {
		case true:
			if (Array.isArray(error)) {
				error?.reverse().forEach((msg) => {
					toast.success(msg, toastConfig("top-right"));
				});
				break;
			} else {
				toast.success(message, toastConfig("top-right"));
				break;
			}

		case false:
			if (typeof errorObj === "object") {
				for (const key in errorObj) {
					const errormessage: string = errorObj[key]?.[0] || errorObj[key]?.message || "";
					toast.error(errormessage, toastConfig("bottom-right"));
				}
			} else if (typeof errorObj === "string") {
				toast.error(errorObj, toastConfig("bottom-right"));
			} else {
				toast.error(errorObj, toastConfig("bottom-right"));
			}
			break;
		default:
			toast.error(message || "Something went wrong", toastConfig("bottom-right"));
			break;
	}
}
