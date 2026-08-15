export interface TaskFilterRequest {
	page?: number;
	pageSize?: number;
	title?: string;
	completed?: boolean;
	startCreatedAt?: number;
	endCreatedAt?: number;
}

export interface Task {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}
