import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import {
  getNewValueForDay,
  getNewValueForMonth,
  getNewValueForYear,
} from "../utils/utils";

type UseDateChooserInputParams = {
  minYear: number;
  maxYear: number;
  month: string;
  year: string;
  inputDayRef: RefObject<HTMLInputElement | null>;
  inputMonthRef: RefObject<HTMLInputElement | null>;
  inputYearRef: RefObject<HTMLInputElement | null>;
  setDay: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<string>>;
  setYear: Dispatch<SetStateAction<string>>;
};

export function useDateChooserInput({
  minYear,
  maxYear,
  month,
  year,
  inputDayRef,
  inputMonthRef,
  inputYearRef,
  setDay,
  setMonth,
  setYear,
}: UseDateChooserInputParams) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputRef: RefObject<HTMLInputElement | null>,
  ) => {
    event.preventDefault();

    const inputElement = inputRef.current;
    const typedChar =
      "data" in event.nativeEvent &&
      typeof event.nativeEvent.data === "string" &&
      /^[0-9]$/.test(event.nativeEvent.data)
        ? event.nativeEvent.data
        : "";

    if (!typedChar || !inputElement) {
      return;
    }

    const cursorPos = inputElement.selectionStart;
    if (cursorPos === null) return;

    const inputValue = inputElement.value;

    if (cursorPos < inputValue.length) {
      const beforeCursor = inputValue.substring(0, cursorPos - 1);
      const afterCursor = inputValue.substring(cursorPos + 1);

      let newValue: string = inputValue;

      if (inputRef === inputDayRef) {
        const computed = getNewValueForDay(
          cursorPos,
          beforeCursor,
          afterCursor,
          parseInt(month, 10),
          parseInt(year, 10),
          typedChar,
        );
        newValue = computed ?? inputValue;
        setDay(newValue);
      }

      if (inputRef === inputMonthRef) {
        const computed = getNewValueForMonth(
          cursorPos,
          beforeCursor,
          afterCursor,
          typedChar,
        );
        newValue = computed ?? inputValue;
        setMonth(newValue);
      }

      if (inputRef === inputYearRef) {
        const computed = getNewValueForYear(
          cursorPos,
          beforeCursor,
          afterCursor,
          minYear,
          maxYear,
          typedChar,
        );
        newValue = computed ?? inputValue;
        setYear(newValue);
      }

      inputElement.value = newValue;
      inputElement.setSelectionRange(cursorPos, cursorPos);

      if (document.activeElement !== inputElement) {
        inputElement.focus();
      }

      const isDayOrMonth =
        inputRef === inputDayRef || inputRef === inputMonthRef;
      const isYear = inputRef === inputYearRef;
      const atRightEdge = cursorPos >= inputElement.value.length;

      if (isDayOrMonth && !isYear && atRightEdge) {
        const nextRef = inputRef === inputDayRef ? inputMonthRef : inputYearRef;

        nextRef.current?.focus();
        nextRef.current?.setSelectionRange(0, 0);
      }
    }
  };

  const handleFocus = (inputRef: RefObject<HTMLInputElement | null>) => {
    inputRef.current?.setSelectionRange(0, 0);
  };

  return {
    handleChange,
    handleFocus,
  };
}
