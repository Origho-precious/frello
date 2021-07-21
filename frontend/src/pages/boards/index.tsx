import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BoardCard from "../../components/composed/Cards/BoardCard/BoardCard";
import Navbar from "../../components/composed/Navbar/Navbar";
import { IBoard } from "../../interfaces/IBoard.interface";
import { selectAuthState } from "../../store/slices/auth.slice";
import { APIClient } from "../../utils/apiClient";

const Boards = () => {
	const {
		profile: { token },
	} = useSelector(selectAuthState);
	const [boards, setBoards] = useState<IBoard[]>([]);

	
	useEffect(() => {
		const getUserCreatedBoards = async () => {
			const api = new APIClient();
	
			try {
				const res = await api.getUserCreatedBoards(token as string);
				setBoards(res)
			} catch (error) {
				console.log(error);
			}
		};
		
		getUserCreatedBoards();
	}, [token]);

	return (
		<Wrapper>
			<Navbar />
			<article className="w-11/12 md:w-9/12 mx-auto mt-6">
				<h2 className="text-3xl font-bold mb-4">BOARDS</h2>
				<section className="flex justify-center lg:justify-start flex-wrap sm:-ml-2">
					{boards.map((board) => (
						<div key={board?._id} className="mx-2 mb-4">
							<BoardCard id={board?._id} title={board?.title} />
						</div>
					))}
				</section>
			</article>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	& > article {
		@media screen and (max-width: 500px) {
			max-width: 95%;
		}
	}
`;

export default Boards;
