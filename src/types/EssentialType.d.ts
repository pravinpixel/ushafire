type EssentailType = "employee" | "status" | "priority" | "task-category";

type EssentailTypeListResponse = {
	id: string | number;
	name: string;
	profile_image?: string;
};

interface EssentailStatus extends EssentailTypeListResponse {
	name: 'completed' | "mark as completed" | "deleted" | "closed" | "inprogress" | '';
}

type EssentailTypeList = {
	[key in EssentailType]: EssentailTypeListResponse[];
};

type EssentailParams = {
	keys: EssentailType[];
};
