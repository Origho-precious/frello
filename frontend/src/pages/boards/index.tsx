import styled from "styled-components";
import BoardCard from "../../components/composed/Cards/BoardCard/BoardCard";
import Navbar from "../../components/composed/Navbar/Navbar";

const boards = [
	{
		id: "hhthey5994",
		title: "Test board",
	},
	{
		id: "ggtheydd5654",
		title: "Learning Nodejs with typescript",
	},
	{
		id: "hhthey43254",
		title: "learning Golang and preparing for google",
	},
	{
		id: "hrtheujn5654",
		title: "learning Golang and preparing for google",
	},
	{
		id: "rhthey88854",
		title: "learning Golang and preparing for google",
	},
];

const Boards = () => {
	return (
		<Wrapper>
			<Navbar />
			<article className="w-11/12 md:w-9/12 mx-auto mt-6">
				<h2 className="text-3xl font-bold mb-4">BOARDS</h2>
				<section className="flex justify-center lg:justify-start flex-wrap sm:-ml-2">
					{boards.map((board) => (
						<div key={board?.id} className="mx-2 mb-4">
							<BoardCard id={board?.id} title={board?.title} />
						</div>
					))}
				</section>
			</article>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	& > article{
		@media screen and (max-width: 500px){
			max-width: 95%;
		}
	}
`;

export default Boards;
