import axios from "axios";
import IHttpRequest from "../../interfaces/IHttpRequest.interface";

const DeleteRequest = async <T>({
	url,
	customHeaders,
	params,
}: IHttpRequest): Promise<T> => {
	try {
		const { data } = await axios.delete(url, {
			headers: {
				"Content-type": "application/json",
				...customHeaders,
			},
			params,
		});

		return data as T;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export default DeleteRequest;
