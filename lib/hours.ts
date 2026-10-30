// Pure opening-hours logic, shared by the "Aperto ora" badge and the tests.
// Times are local to Italy (Europe/Rome) whatever the visitor's device timezone.

export type OpenInterval = { opens: string; closes: string };

/** National holidays on a fixed date (MM-DD): the badge stays silent instead of guessing. */
const fixedHolidays = ['01-01', '01-06', '04-25', '05-01', '06-02', '08-15', '11-01', '12-08', '12-25', '12-26'];

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/** Day of week (0 = Sunday), MM-DD and minutes after midnight, as a clock in Italy shows them. */
export function romeClock(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Rome', weekday: 'short', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(date).map((part) => [part.type, part.value]),
  );
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  return { day, monthDay: `${parts.month}-${parts.day}`, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

/**
 * Plain-Italian status such as "Aperto ora · chiude alle 13:00", for shops open Monday to Saturday.
 * Returns null on national holidays, when the shop's real opening is unknown.
 */
export function openStatus(times: OpenInterval[], date: Date): { open: boolean; text: string } | null {
  const { day, monthDay, minutes } = romeClock(date);
  if (fixedHolidays.includes(monthDay)) return null;
  const first = times[0].opens;
  if (day === 0) return { open: false, text: `Oggi chiuso · riapre lunedì alle ${first}` };
  const current = times.find((t) => minutes >= toMinutes(t.opens) && minutes < toMinutes(t.closes));
  if (current) return { open: true, text: `Aperto ora · chiude alle ${current.closes}` };
  const later = times.find((t) => minutes < toMinutes(t.opens));
  if (later) return { open: false, text: `Chiuso ora · apre alle ${later.opens}` };
  return { open: false, text: `Chiuso ora · riapre ${day === 6 ? 'lunedì' : 'domani'} alle ${first}` };
}
