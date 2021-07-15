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
	label?: string;
	errorMsg?: string;
}

const Input: React.FC<IInputProps> = ({
	disabled,
	className,
	id,
	label,
	errorMsg,
	...rest
}) => {
	return (
		<>
			{label && (
				<label htmlFor={id} className="mb-2 uppercase text-xs block font-bold">
					{label}
				</label>
			)}
			<Element
				disabled={disabled}
				{...rest}
				className={`${
					className ? className : ""
				} text-sm font-semibold block w-full`}
			/>
			<div className="relative">
				{errorMsg && (
					<p className="absolute top-1 text-red-500 font-bold text-xs">
						{errorMsg}
					</p>
				)}
			</div>
		</>
	);
};

const Element = styled.input`
	border-bottom: 2px solid #99b9ee;
	outline: none;
	padding: 0.4rem 0;

	&:hover {
		border-bottom: 2px solid #99b9ee;
	}

	&:focus {
		background: #f7f7f7;
	}
`;

export default Input;
