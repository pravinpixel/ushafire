type ReactComponentType = {
	children?: React.ReactElement | React.ReactNode;
};

type PaginationType = {
	tab: string;
	page?: number;
	per_page: number;
	search?: string | null;
};

type PaginationResponse<T> = {
	data: T;
	current_date?: Date | null;
	current_date_asia?: Date | null;
	total: number;
};

type DocumentsType = {
	id?: number;
	name?: string;
	document?: string;
} & File;

type ParamsType = {
	params: TaskPagination;
	search?: string | null;
	setParams: React.Dispatch<React.SetStateAction<TaskPagination>>;
	handleData?:(pre:FilterTypes)=>void
};

type NotifyType = AxiosError<{
	error?: unknown;
	message?: string;
	success?: boolean;
}>["response"];

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";


type FilterTypes ={
	title?: String;
	value?: number| string;
}



