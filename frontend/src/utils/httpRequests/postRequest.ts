import axios from "axios";
import IHttpRequest from "../../interfaces/IHttpRequest.interface";

const PostRequest = async <T>({
	url,
	customHeaders,
	body,
	params,
}: IHttpRequest): Promise<T> => {
	try {
		const { data } = await axios.post(url, JSON.stringify(body), {
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

export default PostRequest;
