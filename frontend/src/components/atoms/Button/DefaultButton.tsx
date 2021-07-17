import styled from "styled-components";

interface IDefaultButtonProps {
	type: "submit" | "button";
	onClick?: () => void;
	style?: React.CSSProperties;
	className?: string;
	children: React.ReactNode;
}

const DefaultButton: React.FC<IDefaultButtonProps> = ({
	type,
	onClick,
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
			} w-max text-base font-semibold flex flex-col items-center justify-center`}
			type={type}
		>
			{children}
		</Container>
	);
};

const Container = styled.button`
	height: max-content;
	border: none;
	outline: none;
`;

export default DefaultButton;
