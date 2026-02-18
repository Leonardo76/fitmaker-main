import {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
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
import {
  calendarBackgroundColor,
  calendarBorderColor,
  DAY,
  MONTH,
  YEAR,
} from "../lib/constants";
import { calendar } from "../assets";

type TimeFields = typeof DAY | typeof MONTH | typeof YEAR;

type ValidFormats =
  | [typeof DAY, typeof MONTH, typeof YEAR]
  | [typeof DAY, typeof YEAR, typeof MONTH]
  | [typeof MONTH, typeof DAY, typeof YEAR]
  | [typeof MONTH, typeof YEAR, typeof DAY]
  | [typeof YEAR, typeof DAY, typeof MONTH]
  | [typeof YEAR, typeof MONTH, typeof DAY];

export type InputSwitcherProps = {
  minYear: number;
  maxYear?: number;
  classNameContainer?: string;
  classNameDay?: string;
  classNameMonth?: string;
  classNameYear?: string;
  dateFormat?: ValidFormats;
  useCalendar?: boolean;
};

const DateChooser = ({
  minYear,
  maxYear = new Date().getFullYear(),
  classNameContainer,
  classNameDay,
  classNameMonth,
  classNameYear,
  dateFormat = [DAY, MONTH, YEAR],
  useCalendar = true,
}: InputSwitcherProps) => {
  const inputDayRef = useRef<HTMLInputElement | null>(null);
  const inputMonthRef = useRef<HTMLInputElement | null>(null);
  const inputYearRef = useRef<HTMLInputElement | null>(null);
  const [day, setDay] = useState<string>("01");
  const [month, setMonth] = useState<string>("01");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<string>(currentYear.toString());
  const [newPressedKey, setNewPressedKey] = useState("");

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

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
    inputRef: RefObject<HTMLInputElement>,
    nextInputRef: RefObject<HTMLInputElement>,
    prevInputRef: RefObject<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (inputRef.current) {
        const cursorPos = inputRef.current.selectionStart;
        inputRef.current.setSelectionRange(cursorPos + 1, cursorPos + 1);
        if (cursorPos >= inputRef.current.value.length) {
          nextInputRef.current?.focus();
          nextInputRef.current?.setSelectionRange(0, 0);
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (inputRef.current) {
        const cursorPos = inputRef.current.selectionStart;
        inputRef.current.setSelectionRange(cursorPos - 1, cursorPos - 1);
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
    } else if (event.key.length === 1 && /^[0-9]$/.test(event.key)) {
      setNewPressedKey(event.key);
    }
  };

  const handleDecrease = (inputRef: RefObject<HTMLInputElement>) => {
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

  const handleIncrease = (inputRef: RefObject<HTMLInputElement>) => {
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
    inputRef: RefObject<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const inputElement = inputRef.current;

    if (newPressedKey === "") {
      //the pressed key it is not a number (see handleKeyPress)
      return;
    }

    if (inputElement) {
      const cursorPos = inputElement.selectionStart;
      const inputValue = inputElement.value;

      if (cursorPos < inputValue.length) {
        const beforeCursor = inputValue.substring(0, cursorPos - 1);
        const afterCursor = inputValue.substring(cursorPos + 1);

        let newValue: string;
        if (inputRef === inputDayRef) {
          newValue = getNewValueForDay(
            cursorPos,
            beforeCursor,
            afterCursor,
            parseInt(month, 10),
            parseInt(year, 10),
            newPressedKey,
          );
          setDay(newValue);
        }
        if (inputRef === inputMonthRef) {
          newValue = getNewValueForMonth(
            cursorPos,
            beforeCursor,
            afterCursor,
            newPressedKey,
          );
          setMonth(newValue);
        }
        if (inputRef === inputYearRef) {
          newValue = getNewValueForYear(
            cursorPos,
            beforeCursor,
            afterCursor,
            minYear,
            maxYear,
            newPressedKey,
          );
          setYear(newValue);
        }

        inputElement.value = newValue;
        inputElement.setSelectionRange(cursorPos, cursorPos);
        inputElement.focus();
        setNewPressedKey("");
      }
    }
  };

  const handleFocus = (inputRef: RefObject<HTMLInputElement>) => {
    inputRef.current.setSelectionRange(0, 0); // Poziționează cursorul la începutul textului
  };

  const inputMapping: {
    [key in TimeFields]: React.RefObject<HTMLInputElement>;
  } = {
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
              <img src={calendar as string} alt="" className="" />
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
};

export default DateChooser;
