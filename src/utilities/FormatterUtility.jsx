export const formatISODateToYYYYMMDD = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
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
    now.getDate(),
  );

  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    (startOfDate.getTime() - startOfToday.getTime()) / ONE_DAY,
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

export const formatTimeAgo = (date) => {
  if (!date) return "";
  const now = new Date();
  const d = new Date(date);
  const sec = Math.floor((now - d) / 1000);

  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  return `${day}d`;
};

export const formatDueMeta = (dueDate) => {
  if (!dueDate) return "No due date";
  const now = new Date();
  const due = new Date(dueDate);
  const days = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (days < 0) return "Overdue";
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days}d`;
};

export const metaTone = (type, dueDate) => {
  if (type !== "task") return "text-black/40";
  if (!dueDate) return "text-black/40";
  const days = Math.ceil(
    (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24),
  );
  if (days < 0) return "text-red-600/80";
  if (days <= 1) return "text-amber-600/80";
  return "text-black/40";
};
