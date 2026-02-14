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

export function getCurrentDate() {
  // const today = new Date();
  //
  // return (
  //   today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
  // );
  return getStringDate(new Date());
}

export function getStringDate(date: Date) {
  return completeDateWithZeros(
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
  );
}

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
 * Complete necessary zeros to write date correctly.
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
