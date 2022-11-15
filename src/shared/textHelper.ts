export const truncateTextFromMiddle = (text: string, length = 5): string => {
  if (text.length <= length) {
    return text;
  }
  const truncatedText = `${text.substring(0, length)}...${text.substring(
    text.length - length,
    text.length
  )}`;
  return truncatedText;
};
