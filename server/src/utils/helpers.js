export const isWithinOneDay = (date1, date2) => {
  const msInDay = 48 * 60 * 60 * 1000;
  return Math.abs(normalizeDate(date1) - normalizeDate(date2)) < msInDay;
};

// Helper function to normalize the date (remove time)
const normalizeDate = (date) => {
  const requestDate = new Date(date);
  requestDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
  return requestDate;
};
