export interface Todo {
	id: string;
	text: string;
	done: boolean;
	createdAt: number;
	createdBy: string;
}

export type RoomSchema = {
	'topics-example': {
		topics: object;
	};
};

export type Schema = {
	todos: Todo;
	user: { id: string; name: string };
};
