import axios from "axios";
import IHttpRequest from "../../interfaces/IHttpRequest.interface";

const GetRequest = async <T>({
	url,
	customHeaders,
	params,
}: IHttpRequest): Promise<T> => {
	try {
		const { data } = await axios.get(url, {
      headers: {
        "Content-type": "application/json",
				...customHeaders,
			},
			params,
		});

		return data as T;
	} catch (error) {
		throw new Error(error.response);
	}
};

export default GetRequest;
