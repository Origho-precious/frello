import styled from "styled-components";

interface IInputProps {
	disabled?: boolean;
	type: string;
	value: string;
	onChange: (e: any) => void;
	name: string;
	placeholder?: string;
	style?: React.CSSProperties;
	className?: string;
	id?: string;
	onBlur?: (e: any) => void;
}

const Input: React.FC<IInputProps> = ({ disabled, className, ...rest }) => {
	return (
		<Element
			disabled={disabled}
			{...rest}
			className={`${className ? className : ""} text-sm block w-full`}
		/>
	);
};

const Element = styled.input`
	border-bottom: 2px solid #99b9ee;
	outline: none;
	padding: 0.4rem 0.5rem;

	&:hover {
		border-bottom: 2px solid #99b9ee;
	}

	&:focus {
		background: #f7f7f7;
	}
`;

export default Input;
