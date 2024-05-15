export default function handleAllTimeDateDisplay(date: Date): string {
  return Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    month: "short",
  }).format(date);
}
