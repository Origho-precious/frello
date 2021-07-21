import styled from "styled-components";
import { Link } from "react-router-dom";
import { truncateText } from "../../../../utils/helperFunctions";

interface IBoardCardProps {
	id: string;
	title: string;
}

const BoardCard: React.FC<IBoardCardProps> = ({ title, id }) => {
	return (
		<Container className="rounded-md">
			<Link
				style={{ height: "7rem", width: "13rem" }}
				className="block w-full px-3 py-2.5 text-sm"
				to={`/boards/${id}`}
			>
				{truncateText(title, 50)}
			</Link>
		</Container>
	);
};

const Container = styled.div`
	color: #fff;
	font-weight: 700;
	background: hsla(218, 100%, 42%, 1);

	background: linear-gradient(
		315deg,
		hsla(218, 100%, 42%, 1) 0%,
		hsla(218, 100%, 42%, 0.6) 30%
	);

	background: -moz-linear-gradient(
		315deg,
		hsla(218, 100%, 42%, 1) 0%,
		hsla(218, 100%, 42%, 0.6) 30%
	);

	background: -webkit-linear-gradient(
		315deg,
		hsla(218, 100%, 42%, 1) 0%,
		hsla(218, 100%, 42%, 0.6) 30%
	);

	filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0050D6", endColorstr="#0050D6", GradientType=1 );
`;

export default BoardCard;
