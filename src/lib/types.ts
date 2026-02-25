import { z } from "zod";
import { CSSProperties } from "react";
import { completeDateWithZeros } from "./utils";

//region Pentru validări/Zod
// coduri stabile pentru validări (nu depind de limbă)
export const NAME_ONLY_LETTERS = "[NAME_ONLY_LETTERS]";
export const NAME_TOO_SHORT = "[NAME_TOO_SHORT]";
export const NAME_TOO_LONG = "[NAME_TOO_LONG]";

export const EMAIL_INVALID = "[EMAIL_INVALID]";

export const GOAL_TOO_SHORT = "[GOAL_TOO_SHORT]";

export const GENDER_INVALID = "[GENDER_INVALID]";

export const BIRTHDATE_FORMAT = "[BIRTHDATE_FORMAT]";
export const BIRTHDATE_RANGE = "[BIRTHDATE_RANGE]";

export type EmailOptionsType = {
  firstName: string;
  lastName: string;
  email: string;
  sex: GenderType;
  birthDate: string;
  goal: string;
  subject?: string;
};

export type GenderType = "masculin" | "feminin" | "nespecificat";

export interface DatePickerOptions {
  placeHolders?: string[];
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  className?: string;
  onChange?: (value: string | null) => void;
  value?: [string, string, string];
}

export const ValidationSchemas = {
  nume: z.preprocess(
    (v: unknown) => {
      if (typeof v !== "string") return v;
      return v.normalize("NFC").trim().replace(/\s+/g, " ");
    },
    z
      .string()
      .min(2, `${NAME_TOO_SHORT} Introduceti cel putin 2 litere`)
      .max(50, `${NAME_TOO_LONG} Introduceti cel mult 50 de caractere`)
      .refine((v: string) => {
        /**
         * Segment = fie:
         *  - cuvânt: \p{L}+
         *  - abreviere: \p{L}{2,}\.
         *  - abreviere lipită: \p{L}{2,}\.\p{L}{2,}
         *
         * Între segmente permitem: spațiu, -, apostrof simplu (') sau apostrof tipografic (’)
         *
         * Acceptă: "St. John-Paul", "St.John-Paul", "Dr. Șerban", "O’Neill"
         * Respinge inițiale: A., A. B., A.B.
         */
        const word = String.raw`\p{L}+`;
        const abbr = String.raw`\p{L}{2,}\.`; // ex: "Dr."
        const abbrGlued = String.raw`\p{L}{2,}\.\p{L}{2,}`; // ex: "St.John" (nu "St.A")
        const segment = String.raw`(?:${abbrGlued}|${abbr}|${word})`;

        const sep = String.raw`[ '\-’]`; // spațiu, ', -, ’
        const full = new RegExp(
          String.raw`^${segment}(?:${sep}${segment})*$`,
          "u",
        );

        return full.test(v);
      }, `${NAME_ONLY_LETTERS} Doar litere sau spațiu - ' ’ . (în abrevieri, nu inițiale)`),
  ),
  email: z
    .string()
    .trim()
    .refine(
      (v) => z.email().safeParse(v).success,
      `${EMAIL_INVALID} Introduceti o adresa de email valida`,
    ),
  goal: z
    .string()
    .trim()
    .min(5, `${GOAL_TOO_SHORT} Trebuie cel putin 5 litere`),
  sex: z.enum(["masculin", "feminin", "nespecificat"], {
    message: `${GENDER_INVALID} Invalid gender value`,
  }),
};

export function makeBirthDateSchema(minYear: number, maxYear: number) {
  return z
    .string()
    .trim()
    .refine(
      isValidBirthDateYYYYMMDD,
      `${BIRTHDATE_FORMAT} Data nașterii are un format invalid (YYYY/MM/DD) sau zi/lună invalide.`,
    )
    .refine(
      (v) => isValidBirthDateYYYYMMDDInRange(v, minYear, maxYear),
      `${BIRTHDATE_RANGE} Data nașterii trebuie să fie între ${minYear} și ${maxYear}.`,
    );
}

export function makeEmailSubmitSchema(minYear: number, maxYear: number) {
  return z.object({
    firstName: ValidationSchemas.nume,
    lastName: ValidationSchemas.nume,
    email: ValidationSchemas.email,
    sex: ValidationSchemas.sex,
    birthDate: makeBirthDateSchema(minYear, maxYear),
    goal: ValidationSchemas.goal,
    subject: z.string().trim().optional(),
  });
}
// export type EmailSubmitValues = z.infer<typeof EmailSubmitSchema>;
// export type EmailSubmitValues = z.infer<
//   ReturnType<typeof makeEmailSubmitSchema>
// >;

/**
 * NOU: normalizează string-ul către format canonic YYYY/MM/DD:
 * - anul pad la 4 cifre
 * - luna/ziua pad la 2 cifre
 *
 * Exemple:
 *  "2001/4/20" -> "2001/04/20"
 *  "401/10/2" -> "0401/10/02"
 */
export function normalizeBirthDateString(value: string) {
  const v = value.trim();
  // acceptăm doar separatori "/"
  // dacă nu seamănă a dată, nu inventăm nimic, îl returnăm ca atare
  if (!/^\d{1,4}\/\d{1,2}\/\d{1,2}$/.test(v)) return v;

  return completeDateWithZeros(v);
}

/**
 * NOU: verifică strict formatul final YYYY/MM/DD și corectitudinea zilei în lună.
 * Permite anul 0000..9999.
 */
export function isValidBirthDateYYYYMMDD(value: string) {
  const v = value.trim();
  const match = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(v);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!Number.isInteger(year) || year < 0 || year > 9999) return false;
  if (!Number.isInteger(month) || month < 1 || month > 12) return false;
  if (!Number.isInteger(day) || day < 1) return false;

  const maxDaysInMonth = new Date(year, month, 0).getDate();
  return day <= maxDaysInMonth;
}

/**
 * NOU: strict YYYY/MM/DD + range ani (minYear..maxYear)
 */
export function isValidBirthDateYYYYMMDDInRange(
  value: string,
  minYear: number,
  maxYear: number,
) {
  if (!isValidBirthDateYYYYMMDD(value)) return false;
  const year = Number(value.slice(0, 4));
  return year >= minYear && year <= maxYear;
}

//scoate prefixul [CODE] din mesajele Zod
export const stripValidationCode = (message: string) =>
  message.replace(/^\[[A-Z0-9_]+]\s*/, "");

/**
 * Alege mesajul cu prioritate după coduri.
 * Dacă nu găsește niciun cod, returnează primul mesaj disponibil.
 */
export function pickByCodePriority(
  messages: string[] | undefined,
  codes: string[],
) {
  if (!messages || messages.length === 0) return undefined;

  for (const code of codes) {
    const found = messages.find((m) => m.startsWith(code));
    if (found) return found;
  }
  return messages[0];
}
//endregion

// elementul editabil din constants.ts (navLinksConfig)
export type NavLinkConfigItem = {
  title: string; // textul afișat în meniu (traductibil)
  sectionId: string; // id-ul secțiunii din pagină (fără #)
  isCta?: boolean; // opțional: dacă link-ul e CTA (buton evidențiat)
};

export type NavLinksConfig = readonly NavLinkConfigItem[];

// elementul intern generat în Header/MobileMenu
export type NavLinkVariant = "cta";

export type NavLink = {
  id: number;
  title: string;
  href: `#${string}`; // generat din sectionId
  hasChildren: boolean;
  variant?: NavLinkVariant; // cta sau undefined
};

export type NavLinks = readonly NavLink[];
