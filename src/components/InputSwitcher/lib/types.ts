export const DAY = "DAY" as const;
export const MONTH = "MONTH" as const;
export const YEAR = "YEAR" as const;

export type TimeFields = typeof DAY | typeof MONTH | typeof YEAR;

// Helper generic: produce toate permutările posibile ale unei uniuni (ex: A|B|C -> [A,B,C] | [A,C,B] | ...).
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

// Generăm automat cele 6 combinații pentru DAY/MONTH/YEAR.
export type ValidDateFormats = Permutation<TimeFields>;

export type DateChooserProps = {
  minYear: number;
  maxYear?: number;
  classNameContainer?: string;
  classNameDay?: string;
  classNameMonth?: string;
  classNameYear?: string;
  dateFormat?: ValidDateFormats;
  useCalendar?: boolean;
};
