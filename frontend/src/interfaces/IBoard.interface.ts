interface IBoardUser {
	_id: string;
	name: string;
	email: string;
}

export interface ICategory {
	_id: string;
	title: string;
	list?: string[];
	createdAt: Date;
}

export interface IBoard {
  _id: string;
	createdBy: IBoardUser;
	members?: IBoardUser[];
	title: string;
	categories?: ICategory[];
	createdAt: Date;
}
