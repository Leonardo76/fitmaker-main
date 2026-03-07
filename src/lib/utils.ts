import { FigureItem, NavLinks, NavLinksConfig, StatItem } from "./types";

//pentru link-urile din meniu
export function buildNavLinks(navLinksConfig: NavLinksConfig): NavLinks {
  return navLinksConfig.map((item, index) => ({
    // id: generat automat => utilizatorul nu-l editează manual
    id: index + 1,
    // title: vine direct din config-ul simplu
    title: item.title,
    // href: generat automat in sectionId
    href: `#${item.sectionId}`,
    // hasChildren: rămâne false (cum era), nu se repeta în config
    hasChildren: false,
    // variant: derivat din isCta; nu depinde de text și nu are "as const" în config
    variant: "isCta" in item && item.isCta ? ("cta" as const) : undefined,
  }));
}

//region Pentru mesajele din jurul imaginii din Hero

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
// hash determinist -> [0, 1)
function hash01(input: string): number {
  let h = 2166136261; // FNV-1a-ish
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // >>> 0 => unsigned
  return ((h >>> 0) % 100000) / 100000;
}

// jitter mic în [-amp, amp]
function jitter(input: string, amp: number) {
  return (hash01(input) * 2 - 1) * amp;
}

export function buildStats(figures: FigureItem[]): StatItem[] {
  const n = figures.length;
  if (n === 0) return [];

  // centru container
  const cx = 50;
  const cy = 50;

  // Inel în jurul imaginii:
  // 50% ar fi exact pe marginea containerului, dar noi vrem în jurul imaginii + un pic peste halou,
  // fără să fugă în afara secțiunii (care are overflow-hidden).
  // Ajustează după gust: 40..47 e de obicei sigur.
  const baseR = 50;

  // Păstrează cardurile în interiorul containerului relativ (ca să nu fie tăiate de overflow-hidden).
  // Dacă vrei mai peste, micșorează padding-ul, dar ai grijă la tăiere.
  const safeMin = 6;
  const safeMax = 94;

  // start de sus, dar ușor rotit ca să nu arate cruce la 4
  const startDeg = -90 + 12;
  const start = (startDeg * Math.PI) / 180;

  return figures.map((item, index) => {
    const key = `${item.figures}|${item.desc}|${index}`;

    // unghi uniform + jitter mic (în radiani)
    const step = (2 * Math.PI) / n;
    const angle = start + index * step + jitter(key, 0.22); // ~12.6° jitter

    // rază cu jitter + alternare (în/out) ca să reducă alinierea perfectă
    const r = baseR + jitter(key + "|r", 4) + (index % 2 === 0 ? 2.5 : -2.5);

    const x = clamp(cx + r * Math.cos(angle), safeMin, safeMax);
    const y = clamp(cy + r * Math.sin(angle), safeMin, safeMax);

    return {
      id: index + 1,
      ...item,
      positionClass: "-translate-x-1/2 -translate-y-1/2",
      style: {
        left: `${x}%`,
        top: `${y}%`,
      },
    };
  });
}

//endregion

export function capitalize(str: string) {
  // Split into words
  const words = str.split(" ");
  const resWords: string[] = [];
  // loop over words, slicing and capitalizing the first letter of each word.
  words.forEach((word) => {
    const letterOne = word.slice(0, 1);
    const upperCaseLetterOne = letterOne.toUpperCase();
    const otherLetters = word.slice(1);
    const newWord = upperCaseLetterOne + otherLetters;
    resWords.push(newWord);
  });
  // Turn it back into a human-readable string.
  return resWords.join(" ");
}

// export function getCurrentDate() {
//   return getStringDate(new Date());
// }

// export function getStringDate(date: Date) {
//   return completeDateWithZeros(
//     date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
//   );
// }

export function getAge(birthDate: string) {
  const birthDateAsDate = new Date(birthDate);
  const now = new Date();
  let years = now.getFullYear() - birthDateAsDate.getFullYear(); //difference
  // const months = now.getMonth() + 1 - birthDateAsDate.getMonth(); //difference
  // const days = now.getDate() - birthDateAsDate.getDate(); //difference

  const isBeforeBirthday =
    now.getMonth() < birthDateAsDate.getMonth() ||
    (now.getMonth() === birthDateAsDate.getMonth() &&
      now.getDate() < birthDateAsDate.getDate());

  return isBeforeBirthday ? years - 1 : years;
}

/**
 * From date in format yyyy/mm/dd, return date in format dd.mm.yyyy
 * @param date{string} - input date in format yyyy/mm/dd
 */
export function getDateInRomanian(date: string) {
  return completeDateWithZeros(date).split("/").reverse().join(".");
}

/**
 * Add the specified number of leading zeros. If the length of the input string is greater
 * than the desired length of resulting string, returns the input string.
 * @param str{string} - string to be padded
 * @param lengthOfResultingText {number} - length of resulting string
 */
export function completeWithZeros(
  str: string,
  lengthOfResultingText: number = 2,
) {
  return str.padStart(lengthOfResultingText, "0");
}

/**
 * Complete necessary zeros to write the date correctly.
 * The month and day are completed, if necessary, with leading zeros to a length of two digits.
 * The year is completed with leading zeros to a length of four digits.
 * @param date - input date in format yyyy/mm/dd
 */
export function completeDateWithZeros(date: string) {
  const dates = date.split("/");
  return dates
    .map((datePart, index) => {
      return completeWithZeros(datePart, index === 0 ? 4 : 2);
    })
    .join("/");
}

export function getRidOfDiacritics(text: string) {
  return text
    .replace("Ă", "A")
    .replace("ă", "a")
    .replace("Î", "I")
    .replace("î", "i")
    .replace("Â", "A")
    .replace("â", "a")
    .replace("Ș", "S")
    .replace("ș", "s")
    .replace("Ț", "T")
    .replace("ț", "t");
}
