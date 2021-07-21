import { IBoard } from "../interfaces/IBoard.interface";
import GetRequest from "./httpRequests/getRequest";

export class APIClient {
	// private apiUrl: string;
	// constructor() {
	//   this.apiUrl = process.env.REACT_APP_URL as string;
	// }

	async getUserCreatedBoards(token: string): Promise<IBoard[]> {
		return GetRequest<IBoard[]>({
			url: "/api/boards",
			customHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
}
