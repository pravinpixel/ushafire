type TaskComment = {
	task_id?: string;
	name?: string;
	id?: string;
	mark_as_completed?: 0 | 1;
	send_private?: 0 | 1;
	comment?: string;
	created_at?: Date;
	createdby: LoginType;
	from_id?: number;
	from?: LoginType;
	to?: LoginType;
	fromid?: LoginType;
	documents: DocumentsType[];
};

type TaskFormType = {
	id?: string;
	recurrence?: string;
	due_date?: string;
	priority?: EssentailTypeListResponse;
	post?: string;
	title?: string;
	description?: string;
	name?: string;
	date?: Date;
	deadline?: Date;
	current_date?: Date;
	current_date_asia?: Date;
	time?: string;
	is_recurrence?: 0 | 1;
	priority_id?: EssentailTypeListResponse;
	assignedby?: EssentailTypeListResponse;
	assigned_by?: number;
	assigned_to?: number;
	assignedto?: EssentailTypeListResponse;
	followers?: string;
	additional_followers?: string;
	rating_remark?: string;
	task_rating?: 1 | 2 | 3 | 4 | 5;
	status?: EssentailStatus | null;
	documents?: DocumentsType[];
	assignedby?: EssentailTypeListResponse | null;
	assignedto?: EssentailTypeListResponse | null;
	created_at?: Date | null;
	created_by?: string;
	deleted_at?: Date;
	task_id?: string;
	mark_as_completed?: 0 | 1;
	status_date?: Date;
	is_read?: 0 | 1;
	unread?:boolean;
	comments?: TaskComment[];
	is_delete?:boolean
	task_no?:string
};

interface TaskPagination extends PaginationType {
	tab?: "my_task" | "assigned_task" | "archived";
	priority_id: string[];
	sort_column: "new_task" | "created_at" | "asce" | "desc" | null;
	deadline: string[];
}


type ChangePasswordType={
	old_password: string;
	new_password: string;
	confirm_password:string
}