/**
 * Gets the maximum number of days for a given month and year
 */
export const getMaxDays = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

/**
 * Calculates the new day value based on cursor position and input
 */
export const getNewValueForDay = (
  cursorPos: number,
  beforeCursor: string,
  afterCursor: string,
  month: number,
  year: number,
  newPressedKey: string,
) => {
  const maxDays = getMaxDays(month, year);

  if (cursorPos === 1 && newPressedKey === "0") {
    return "0" + afterCursor;
  } else if (cursorPos === 1 && newPressedKey === "1") {
    return "1" + afterCursor;
  } else if (
    cursorPos === 1 &&
    (newPressedKey === "2" || newPressedKey === "3")
  ) {
    const tempNewValue = parseInt(newPressedKey + afterCursor, 10);
    if (tempNewValue >= maxDays) {
      return maxDays.toString().padStart(2, "0");
    }
    if (tempNewValue < maxDays) {
      return tempNewValue.toString().padStart(2, "0");
    }
  } else if (cursorPos === 1 && parseInt(newPressedKey, 10) > 3) {
    return maxDays.toString().padStart(2, "0");
  } else if (cursorPos === 2) {
    const tempNewValue = parseInt(beforeCursor + newPressedKey, 10);

    if (tempNewValue >= maxDays) {
      return maxDays.toString().padStart(2, "0");
    }
    if (tempNewValue < maxDays) {
      return tempNewValue.toString().padStart(2, "0");
    }
  }
};

/**
 * Calculates the new month value based on cursor position and input
 */
export const getNewValueForMonth = (
  cursorPos: number,
  beforeCursor: string,
  afterCursor: string,
  newPressedKey: string,
) => {
  switch (cursorPos) {
    case 1:
      if (newPressedKey === "0") {
        if (afterCursor === "0") {
          return "01";
        } else {
          return "0" + afterCursor;
        }
      } else if (newPressedKey === "1") {
        const afterTemp = parseInt(afterCursor, 10);
        if (afterTemp <= 2) {
          return "1" + afterTemp;
        } else {
          return "12";
        }
      } else if (parseInt(newPressedKey, 10) > 1) {
        return "12";
      }
      break;
    case 2:
      if (newPressedKey === "0") {
        if (beforeCursor === "0") {
          return "01";
        } else if (beforeCursor === "1") {
          return "10";
        } else {
          return "12";
        }
      } else if (newPressedKey === "1") {
        if (beforeCursor === "0") {
          return "01";
        } else if (beforeCursor === "1") {
          return "11";
        } else {
          return "12";
        }
      } else {
        if (beforeCursor === "0") {
          return "0" + newPressedKey;
        } else {
          return "12";
        }
      }
    default:
      return "01";
  }
};

// /**
//  * Helper to get the first 3 digits of the max year for validation
//  */
// const getFirstThreeNumbersOfYear = (year: number) => {
//   return parseInt(year.toString().substring(0, 3), 10);
// };

/**
 * Calculates the new year value based on cursor position and input
 */
export const getNewValueForYear = (
  cursorPos: number,
  beforeCursor: string,
  afterCursor: string,
  minYear: number,
  maxYear: number,
  newPressedKey: string,
) => {
  return checkYear(
    (cursorPos === 1 ? "" : beforeCursor) +
      newPressedKey +
      (cursorPos === 4 ? "" : afterCursor),
    minYear,
    maxYear,
  )
    .toString()
    .padStart(4, "0");
};

/**
 * Check if the year is between limits
 */
function checkYear(year: string, minYear: number, maxYear: number) {
  const anTemp = parseInt(removeLeadingZeros(year), 10);
  if (anTemp <= minYear) {
    return minYear;
  } else if (anTemp >= maxYear) {
    return maxYear;
  } else {
    return anTemp;
  }
}

export function removeLeadingZeros(str: string): string {
  // Handle empty or non-string input
  if (!str || typeof str !== "string") return "0";

  // Split into integer and fractional parts
  const [integerPart, fractionalPart] = str.split(".");

  // Process integer part: remove leading zeros, but keep at least one digit
  const cleanedInteger = integerPart.replace(/^0+/, "") || "0";

  // Reconstruct the result
  return fractionalPart !== undefined
    ? `${cleanedInteger}.${fractionalPart}`
    : cleanedInteger;
}

/**
 * Used for generating new Date for years older than 1900
 */
export function getOldDateString(year: string, month: string, day: string) {
  const date = new Date();
  date.setFullYear(
    parseInt(removeLeadingZeros(year), 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );
  return date;
}

/**
 * Used for generating new Date for years older than 1900
 */
export function getOldDate(year: number, month: number, day: number) {
  const date = new Date();
  date.setFullYear(year, month, day);
  return date;
}

/**
 * Used for the title of Calendar (return January 2026 or similar)
 */
export function getMonthAndYear(year: number, month: number, day: number) {
  const date = getOldDate(year, month, day);
  const monthShortString = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return capitalize(monthShortString);
}

/**
 * Capitalize first letter of the words in the string
 */
function capitalize(str: string) {
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
