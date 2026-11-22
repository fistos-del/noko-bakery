// Central rules for delivery/collection dates.
// Dimpho is closed Sundays and public holidays. Minimum lead time is 48h.

// South African public holidays for the next few years.
// Update this list annually, or move to an admin-editable table later.
const PUBLIC_HOLIDAYS: string[] = [
  // 2026
  "2026-01-01", // New Year's Day
  "2026-03-21", // Human Rights Day
  "2026-04-03", // Good Friday
  "2026-04-06", // Family Day
  "2026-04-27", // Freedom Day
  "2026-05-01", // Workers' Day
  "2026-06-16", // Youth Day
  "2026-08-09", // National Women's Day
  "2026-09-24", // Heritage Day
  "2026-12-16", // Day of Reconciliation
  "2026-12-25", // Christmas Day
  "2026-12-26", // Day of Goodwill
  // 2027
  "2027-01-01",
  "2027-03-21",
  "2027-03-26", // Good Friday (approx)
  "2027-03-29", // Family Day (approx)
  "2027-04-27",
  "2027-05-01",
  "2027-06-16",
  "2027-08-09",
  "2027-09-24",
  "2027-12-16",
  "2027-12-25",
  "2027-12-26",
];

function toDateKey(d: Date): string {
  // YYYY-MM-DD in local time (South Africa)
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isBlockedDate(d: Date): { blocked: boolean; reason?: string } {
  if (d.getDay() === 0) {
    return { blocked: true, reason: "We're closed on Sundays." };
  }
  if (PUBLIC_HOLIDAYS.includes(toDateKey(d))) {
    return { blocked: true, reason: "We're closed on public holidays." };
  }
  return { blocked: false };
}

/**
 * Earliest allowed delivery/collection date, given a "now".
 * - 48 hours minimum lead time
 * - Skipped Sundays and public holidays
 * - Saturday order → Monday earliest (follows naturally)
 */
export function getEarliestDeliveryDate(now: Date = new Date()): Date {
  // Start at now + 48 hours
  const candidate = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  // Normalise to midnight local
  candidate.setHours(0, 0, 0, 0);

  // Advance until an allowed day
  while (isBlockedDate(candidate).blocked) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate;
}

/**
 * Returns true if the given date string (YYYY-MM-DD) is valid to order for.
 */
export function validateDeliveryDate(
  dateStr: string,
  now: Date = new Date()
): { valid: boolean; error?: string } {
  if (!dateStr) return { valid: false, error: "Please pick a delivery date" };

  const parsed = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(parsed.getTime())) {
    return { valid: false, error: "Invalid date" };
  }

  const blocked = isBlockedDate(parsed);
  if (blocked.blocked) {
    return { valid: false, error: blocked.reason || "That date is not available." };
  }

  const earliest = getEarliestDeliveryDate(now);
  if (parsed < earliest) {
    return {
      valid: false,
      error: `Orders need at least 48 hours' notice. The earliest available date is ${earliest.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })}.`,
    };
  }

  return { valid: true };
}
