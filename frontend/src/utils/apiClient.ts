import { IBoard } from "../interfaces/IBoard.interface";
import GetRequest from "./httpRequests/getRequest";
// import PostRequest from "./httpRequests/postRequest";
// import PatchRequest from "./httpRequests/patchRequest";
// import DeleteRequest from "./httpRequests/deleteRequest";

export class APIClient {
	// private apiUrl: string;
	// constructor() {
	//   this.apiUrl = process.env.REACT_APP_API_URL as string;
	// }

	async getUserCreatedBoards(token: string): Promise<IBoard[]> {
		return GetRequest<IBoard[]>({
			url: "/api/boards",
			customHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	async getBoardsInvitedTo(token: string): Promise<IBoard[]> {
		return GetRequest<IBoard[]>({
			url: "/api/boards/invitedto",
			customHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
}
