import styled from "styled-components";

interface IButtonProps {
	type: "submit" | "button";
	onClick?: () => void;
	style?: React.StyleHTMLAttributes<StyleSheet>;
	className?: string;
	children: React.ReactNode;
	disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
	type,
	onClick,
	disabled = false,
	style,
	className,
	children,
}) => {
	return (
		<Container
			onClick={onClick}
			style={style}
			className={`${
				className && className
			} relative w-full text-white text-base font-semibold flex flex-col items-center justify-center rounded-lg`}
			type={type}
			disabled={disabled}
		>
			{children}
		</Container>
	);
};

const Container = styled.button`
	height: 55px;
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

	border: none;
	outline: none;
	overflow: hidden;
	opacity: ${(props) => (props.disabled !== true ? 1 : 0.8)};
	transition: 0.75s all ease;

	&:before {
		content: "";
		width: 100%;
		height: 100%;
		background-color: ${(props) =>
			props.disabled !== true ? "rgba(0, 0, 0, 0.1)" : null};
		position: absolute;
		transition: all 1s ease;
		top: 0;
		left: -100%;
		z-index: 1;
	}

	&:hover:before {
		left: 0;
	}
`;

export default Button;
