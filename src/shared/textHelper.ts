export const truncateTextFromMiddle = (text: string, length = 5): string => {
  const truncatedText = `${text.substring(0, length)}...${text.substring(
    text.length - length,
    text.length
  )}`;
  return truncatedText;
};
