// import { useSelector } from "react-redux"
import styled from "styled-components";
import DefaultButton from "../../atoms/Button/DefaultButton";

const Navbar = () => {
	return (
		<Nav className="flex items-center justify-between px-20 py-2">
			<p style={{ color: "#CCE1ED", fontWeight: 900 }} className="text-base">
				FRELLO
			</p>
			<DefaultButton
				style={{ color: "#CCE1ED", fontWeight: 900, fontSize: "13px" }}
				type="button"
			>
				SIGN OUT
			</DefaultButton>
		</Nav>
	);
};

const Nav = styled.nav`
	height: max-content;
	background: hsla(218, 90%, 42%, 1);
`;

export default Navbar;
