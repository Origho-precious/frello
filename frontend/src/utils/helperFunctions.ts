export const truncateText = (text: string, max: number) => {
	const newText = text.substring(0, max - 3);
	return text.length >= max ? `${newText}...` : text;
};
