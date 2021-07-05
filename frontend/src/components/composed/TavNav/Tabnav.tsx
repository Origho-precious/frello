import styled from "styled-components";

interface ITabNav {
	index: number;
	setIndex: (index: number) => void;
	options: string[];
}

const TabNav: React.FC<ITabNav> = ({ index, setIndex, options }) => {
	return (
		<TabWrapper className="grid grid-cols-2 gap-20 w-full">
			{options.map((option, idx) => (
				<span
					className={idx === index ? "text-lg" : "opacity-30 text-lg"}
					role="button"
					onClick={() => setIndex(idx)}
				>
					{option}
				</span>
			))}
		</TabWrapper>
	);
};

const TabWrapper = styled.div`
	span {
		border: none;
		display: block;
		border-bottom: 2px solid #333;
		line-height: 35px;
		font-weight: 700;
	}
`;

export default TabNav;
