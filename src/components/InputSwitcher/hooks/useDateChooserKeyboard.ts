import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";
import { TimeFields } from "../lib/types";
import { getMaxDays } from "../utils/utils";

type UseDateChooserKeyboardParams = {
  minYear: number;
  maxYear: number;
  useCalendar: boolean;
  dateFormatResolved: TimeFields[];
  inputMapping: Record<TimeFields, RefObject<HTMLInputElement | null>>;
  inputDayRef: RefObject<HTMLInputElement | null>;
  inputMonthRef: RefObject<HTMLInputElement | null>;
  inputYearRef: RefObject<HTMLInputElement | null>;
  setDay: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<string>>;
  setYear: Dispatch<SetStateAction<string>>;
  setIsCalendarOpen: Dispatch<SetStateAction<boolean>>;
  month: string;
  year: string;
};

export function useDateChooserKeyboard({
  minYear,
  maxYear,
  useCalendar,
  dateFormatResolved,
  inputMapping,
  inputDayRef,
  inputMonthRef,
  inputYearRef,
  setDay,
  setMonth,
  setYear,
  setIsCalendarOpen,
  month,
  year,
}: UseDateChooserKeyboardParams) {
  const handleDecrease = (inputRef: RefObject<HTMLInputElement | null>) => {
    if (!inputRef.current) return;

    switch (inputRef) {
      case inputDayRef:
        setDay((prev) => {
          const currentDay = parseInt(prev, 10);
          if (currentDay <= 1) {
            const maxDays = getMaxDays(parseInt(month, 10), parseInt(year, 10));
            return maxDays.toString().padStart(2, "0");
          }
          return (currentDay - 1).toString().padStart(2, "0");
        });
        break;
      case inputMonthRef:
        setMonth((prev) => {
          const currentMonth = parseInt(prev, 10);
          if (currentMonth <= 1) {
            return "12";
          }
          return (currentMonth - 1).toString().padStart(2, "0");
        });
        break;
      case inputYearRef:
        setYear((prev) => {
          const newYear = parseInt(prev, 10) - 1;
          return newYear < minYear
            ? maxYear.toString().padStart(4, "0")
            : newYear.toString().padStart(4, "0");
        });
        break;
    }
  };

  const handleIncrease = (inputRef: RefObject<HTMLInputElement | null>) => {
    if (!inputRef.current) return;

    if (inputRef === inputDayRef) {
      setDay((prev) => {
        const currentDay = parseInt(prev, 10);
        const maxDays = getMaxDays(parseInt(month, 10), parseInt(year, 10));

        if (currentDay + 1 > maxDays) {
          return "01";
        }
        return (currentDay + 1).toString().padStart(2, "0");
      });
    } else if (inputRef === inputMonthRef) {
      setMonth((prev) => {
        const currentMonth = parseInt(prev, 10);

        if (currentMonth === 12) {
          return "01";
        }
        return (currentMonth + 1).toString().padStart(2, "0");
      });
    } else if (inputRef === inputYearRef) {
      setYear((prev) => {
        return prev === maxYear.toString()
          ? minYear.toString().padStart(4, "0")
          : (parseInt(prev, 10) + 1).toString().padStart(4, "0");
      });
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    inputRef: RefObject<HTMLInputElement | null>,
    nextInputRef: RefObject<HTMLInputElement | null>,
    prevInputRef: RefObject<HTMLInputElement | null>,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (inputRef.current) {
        const el = inputRef.current;
        const cursorPos = el.selectionStart;
        if (cursorPos === null) return;

        el.setSelectionRange(cursorPos + 1, cursorPos + 1);
        if (cursorPos >= el.value.length) {
          nextInputRef.current?.focus();
          nextInputRef.current?.setSelectionRange(0, 0);
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (inputRef.current) {
        const el = inputRef.current;
        const cursorPos = el.selectionStart;
        if (cursorPos === null) return;

        el.setSelectionRange(cursorPos - 1, cursorPos - 1);
        if (cursorPos - 1 < 0) {
          prevInputRef.current?.focus();
          prevInputRef.current?.setSelectionRange(
            prevInputRef.current.value.length,
            prevInputRef.current.value.length,
          );
        }
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      handleDecrease(inputRef);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      handleIncrease(inputRef);
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      if (inputRef.current) {
        switch (inputRef) {
          case inputDayRef:
            setDay("01");
            break;
          case inputMonthRef:
            setMonth("01");
            break;
          case inputYearRef:
            setYear(new Date().getFullYear().toString());
            break;
        }
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsCalendarOpen(false);
    } else if (event.key === "Enter") {
      event.preventDefault();
      setIsCalendarOpen(useCalendar && true);
    } else if (event.key === "Tab") {
      if (event.shiftKey) {
        if (prevInputRef !== inputYearRef) {
          event.preventDefault();
          prevInputRef.current?.focus();
          prevInputRef.current?.setSelectionRange(0, 0);
        }
      } else {
        if (nextInputRef !== inputDayRef) {
          event.preventDefault();
          nextInputRef.current?.focus();
          nextInputRef.current?.setSelectionRange(0, 0);
        }
      }
    }
  };

  const handleKeyDownWrapper = (
    event: KeyboardEvent<HTMLInputElement>,
    field: TimeFields,
  ) => {
    const index = dateFormatResolved.indexOf(field);

    const nextIndex = (index + 1) % dateFormatResolved.length;
    const nextField = dateFormatResolved[nextIndex];

    const prevIndex =
      (index + dateFormatResolved.length - 1) % dateFormatResolved.length;
    const prevField = dateFormatResolved[prevIndex];

    handleKeyDown(
      event,
      inputMapping[field],
      inputMapping[nextField],
      inputMapping[prevField],
    );
  };

  return {
    handleKeyDownWrapper,
  };
}
