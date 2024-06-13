export interface User {
	id: string;
	email: string;
	handle: boolean;
	createdAt: number;
}

export interface Todo {
	id: string;
	text: string;
	done: boolean;
	createdAt: number;
	createdBy: string;
}

export type RoomSchema = {
	topics: object;
};

export type Schema = {
	todos: Todo;
	user: { id: string; name: string };
};
