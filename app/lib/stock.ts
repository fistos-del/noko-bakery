export function stockStatus(current: number, min: number) {
  const ratio = current / min;
  if (ratio < 1) return { label: "CRITICAL", color: "#DC2626", icon: "🔴" };
  if (ratio < 1.5) return { label: "LOW", color: "#F59E0B", icon: "🟡" };
  return { label: "OK", color: "#10B981", icon: "🟢" };
}

export function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}