
/**
 * Format a number with commas for better readability
 * @param num Number to format
 * @returns Formatted string with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Creates a share text for social media
 * @param poolAmount Current pool amount
 * @param totalDonors Total number of donors
 * @returns Formatted share text
 */
export const createShareText = (poolAmount: number, totalDonors: number): string => {
  const formattedAmount = formatNumber(poolAmount);
  const formattedDonors = formatNumber(totalDonors);
  
  return `Check out the OneDollarGoldCard pool! Already reached $${formattedAmount} with ${formattedDonors} donors. Join us! #OneDollarGoldCard`;
};

/**
 * Shares content on Twitter/X
 * @param text The text to share
 */
export const shareOnX = (text: string): void => {
  const url = window.location.href;
  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
};
