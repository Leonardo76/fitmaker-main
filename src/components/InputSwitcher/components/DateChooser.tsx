import {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getMaxDays,
  getNewValueForDay,
  getNewValueForMonth,
  getNewValueForYear,
  getOldDateString,
} from "../utils/utils";
import Calendar from "./ui/Calendar";
import Button from "./ui/Button";
import { calendarBackgroundColor, calendarBorderColor } from "../lib/constants";
import { calendar } from "../assets";
import { useEmailStore } from "../../../stores/useEmailStore";
import { useErrorStore } from "../../../stores/useErrorStore";
import { makeBirthDateSchema, stripValidationCode } from "../../../lib/types";

import { DateChooserProps, DAY, MONTH, TimeFields, YEAR } from "../lib/types";

export default function DateChooser({
  minYear,
  maxYear = new Date().getFullYear(),
  classNameContainer,
  classNameDay,
  classNameMonth,
  classNameYear,
  dateFormat = [DAY, MONTH, YEAR],
  useCalendar = true,
}: DateChooserProps) {
  const inputDayRef = useRef<HTMLInputElement | null>(null);
  const inputMonthRef = useRef<HTMLInputElement | null>(null);
  const inputYearRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [day, setDay] = useState<string>("01");
  const [month, setMonth] = useState<string>("01");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<string>(currentYear.toString());
  // VECHI:
  // const [newPressedKey, setNewPressedKey] = useState("");
  // NOU:
  // removed: on mobile, virtual keyboards don't reliably trigger keydown for digits
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const birthDateInStore = useEmailStore((state) => state.birthDate);
  const setBirthDate = useEmailStore((state) => state.setBirthDate);
  const setBirthDateError = useErrorStore((state) => state.setBirthDateError);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  useEffect(() => {
    setDay((prev) =>
      Math.min(
        Math.max(parseInt(prev, 10), 1),
        getMaxDays(parseInt(month, 10), parseInt(year, 10)),
      )
        .toString()
        .padStart(2, "0"),
    );
    setMonth((prev) =>
      Math.min(Math.max(parseInt(prev, 10), 1), 12)
        .toString()
        .padStart(2, "0"),
    );
  }, [month, year]);

  const birthDateSchema = useMemo(
    () => makeBirthDateSchema(minYear, maxYear),
    [minYear, maxYear],
  );

  useEffect(() => {
    const yyyy = year.toString().padStart(4, "0");
    const mm = month.toString().padStart(2, "0");
    const dd = day.toString().padStart(2, "0");
    const birthDate = `${yyyy}/${mm}/${dd}`;

    if (birthDateInStore !== birthDate) {
      setBirthDate(birthDate);
    }

    const result = birthDateSchema.safeParse(birthDate);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      setBirthDateError(stripValidationCode(firstIssue.message));
    } else {
      setBirthDateError("");
    }
  }, [
    day,
    month,
    year,
    birthDateSchema,
    birthDateInStore,
    setBirthDate,
    setBirthDateError,
  ]);

  const handleCalendarSelect = (date: Date) => {
    setDay(date.getDate().toString().padStart(2, "0"));
    setMonth((date.getMonth() + 1).toString().padStart(2, "0"));
    setYear(date.getFullYear().toString().padStart(4, "0"));
  };

  const handleButtonKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsCalendarOpen(false);
    } else if (event.key === "Enter") {
      event.preventDefault();
      setIsCalendarOpen(useCalendar && true);
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
      // VECHI:
      // } else if (event.key.length === 1 && /^[0-9]$/.test(event.key)) {
      //   setNewPressedKey(event.key);
      // }
      // NOU:
      // digits are handled in onChange using nativeEvent.data
    }
  };

  const handleDecrease = (inputRef: RefObject<HTMLInputElement | null>) => {
    if (inputRef.current) {
      switch (inputRef) {
        case inputDayRef:
          setDay((prev) => {
            const currentDay = parseInt(prev, 10);
            if (currentDay <= 1) {
              const maxDays = getMaxDays(
                parseInt(month, 10),
                parseInt(year, 10),
              );
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
    }
  };

  const handleIncrease = (inputRef: RefObject<HTMLInputElement | null>) => {
    if (inputRef.current) {
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
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputRef: RefObject<HTMLInputElement | null>,
  ) => {
    event.preventDefault();

    const inputElement = inputRef.current;

    // VECHI:
    // if (newPressedKey === "") {
    //   //the pressed key it is not a number (see handleKeyPress)
    //   return;
    // }
    // NOU:
    const typedChar =
      "data" in event.nativeEvent &&
      typeof event.nativeEvent.data === "string" &&
      /^[0-9]$/.test(event.nativeEvent.data)
        ? event.nativeEvent.data
        : "";

    // NOU:
    if (!typedChar) {
      return;
    }

    if (inputElement) {
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
            // VECHI: newPressedKey,
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
            // VECHI: newPressedKey,
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
            // VECHI: newPressedKey,
            typedChar,
          );
          newValue = computed ?? inputValue;
          setYear(newValue);
        }

        inputElement.value = newValue;

        inputElement.setSelectionRange(cursorPos, cursorPos);
        inputElement.focus();

        const isDayOrMonth =
          inputRef === inputDayRef || inputRef === inputMonthRef;
        const isYear = inputRef === inputYearRef;

        const atRightEdge = cursorPos >= inputElement.value.length;

        if (isDayOrMonth && !isYear && atRightEdge) {
          const nextRef =
            inputRef === inputDayRef ? inputMonthRef : inputYearRef;

          nextRef.current?.focus();
          nextRef.current?.setSelectionRange(0, 0);
        }

        // VECHI:
        // setNewPressedKey("");
        // NOU:
        // no-op, value is read directly from the input event
      }
    }
  };

  const handleFocus = (inputRef: RefObject<HTMLInputElement | null>) => {
    inputRef.current?.setSelectionRange(0, 0);
  };

  const inputMapping: Record<TimeFields, RefObject<HTMLInputElement | null>> = {
    [DAY]: inputDayRef,
    [MONTH]: inputMonthRef,
    [YEAR]: inputYearRef,
  };

  const handleKeyDownWrapper = (
    event: KeyboardEvent<HTMLInputElement>,
    field: TimeFields,
  ) => {
    const index = dateFormat.indexOf(field);

    const nextIndex = (index + 1) % dateFormat.length;
    const nextField = dateFormat[nextIndex];

    const prevIndex = (index + dateFormat.length - 1) % dateFormat.length;
    const prevField = dateFormat[prevIndex];

    handleKeyDown(
      event,
      inputMapping[field],
      inputMapping[nextField],
      inputMapping[prevField],
    );
  };

  return (
    <div className={`relative ${classNameContainer}`}>
      <div className="flex gap-2 flex-col justify-center align-middle items-center">
        <div className="flex  items-center">
          <div className="flex w-full ">
            {dateFormat.map((field) => (
              <input
                key={field}
                type="text"
                ref={inputMapping[field]}
                placeholder={
                  field === DAY
                    ? "Day (01-31)"
                    : field === MONTH
                      ? "Month (01-12)"
                      : `Year (${minYear.toString()})-${maxYear.toString()}`
                }
                value={field === DAY ? day : field === MONTH ? month : year}
                className={`w-full text-center outline-none ${field === DAY ? classNameDay : field === MONTH ? classNameMonth : classNameYear}`}
                onChange={(e) => handleChange(e, inputMapping[field])}
                onKeyDown={(event) => handleKeyDownWrapper(event, field)}
                onFocus={() => handleFocus(inputMapping[field])}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={() => setIsCalendarOpen(useCalendar && !isCalendarOpen)}
            className={
              isCalendarOpen ? "scale-125 border-l border-r border-white" : ""
            }
            onKeyDown={handleButtonKeyDown}
          >
            {useCalendar && (
              <img src={calendar as string} alt="Calendar" className="" />
            )}
          </Button>
        </div>
      </div>

      {isCalendarOpen && (
        <Calendar
          ref={calendarRef}
          calendarClasses={`absolute top-full mt-2 z-50 rounded-lg shadow-lg p-4 w-72 w-full lg:w-fit border ${calendarBorderColor} ${calendarBackgroundColor}`}
          selectedDate={getOldDateString(year, month, day)}
          onSelect={handleCalendarSelect}
          minYear={minYear}
          maxYear={maxYear}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}
    </div>
  );
}
