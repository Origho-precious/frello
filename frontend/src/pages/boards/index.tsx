import styled from "styled-components";
import BoardCard from "../../components/composed/Cards/BoardCard/BoardCard";
import Navbar from "../../components/composed/Navbar/Navbar";

const boards = [
	{
		id: "hhthey5654",
		title: "Test board",
	},
	{
		id: "ggtheydd5654",
		title: "Learning Nodejs with typescript",
	},
	{
		id: "hhthey5654",
		title: "learning Golang and preparing for google",
	},
];

const Boards = () => {
	return (
		<Wrapper>
			<Navbar />
			<article>
				<h2 className="text-3xl font-bold">BOARDS</h2>
				<section className="flex items-center">
					{boards.map((board) => (
						<div key={board?.title} className="mx-3">
							<BoardCard id={board?.id} title={board?.title} />
						</div>
					))}
				</section>
			</article>
		</Wrapper>
	);
};
const Wrapper = styled.div``;

export default Boards;
