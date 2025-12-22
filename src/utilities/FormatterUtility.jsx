export const formatISODateToYYYYMMDD = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

export function formatPrettyDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month}, ${year}`;
}

export const getDateDifference = (startDate, endDate) => {
  const diff = new Date(endDate) - new Date(startDate);
  if (diff < 0) return "Overdue";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;

  const minutes = Math.floor(diff / (1000 * 60));
  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
};

export function formatUnderScores(input, capitalize = true) {
  return capitalize
    ? input.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : input.replace(/_/g, " ");
}

export function getInitials(firstName, lastName) {
  return firstName.trim()[0].toUpperCase() + lastName.trim()[0].toUpperCase();
}

export function formatSmartDate(input) {
  const date = new Date(input);
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    (startOfDate.getTime() - startOfToday.getTime()) / ONE_DAY
  );

  if (diffDays === -1) return "Yesterday";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  if (diffDays >= -7 && diffDays < -1) return "Last week";
  if (diffDays <= 7 && diffDays > 1) return "Next week";

  const sameYear = date.getFullYear() === now.getFullYear();

  const options = {
    month: "short",
    day: "numeric",
  };

  if (!sameYear) {
    options.year = "numeric";
  }

  return date.toLocaleDateString("en-US", options);
}
