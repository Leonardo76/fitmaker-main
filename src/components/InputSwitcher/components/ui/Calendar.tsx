import Button from "./Button";
import { Ref, useEffect, useState } from "react";
import {
  disabledDayBackgroundColor,
  disabledDayTextColor,
  monthTextColor,
  nextMonthBackgroundColor,
  nextMonthBackgroundColorHover,
  nextMonthTextColor,
  nextMonthTextColorHover,
  notSelectedNotDisabledDayBackgroundColor,
  notSelectedNotDisabledDayBackgroundColorHover,
  notSelectedNotDisabledDayTextColor,
  notSelectedNotDisabledDayTextColorHover,
  previewsMonthBackgroundColor,
  previewsMonthBackgroundColorHover,
  previewsMonthTextColor,
  previewsMonthTextColorHover,
  selectedDayBackgroundColor,
  selectedDayBackgroundColorHover,
  selectedDayTextColor,
  selectedDayTextColorHover,
  todayBackgroundColor,
  todayBackgroundColorHover,
  todayBorderColor,
  todayTextColor,
  todayTextColorHover,
  WEEK_DAYS,
  weekDaysTextColor,
} from "../../lib/constants";

import { getMonthAndYear, getOldDate } from "../../utils/utils";
import classNames from "classnames";

interface CalendarProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  minYear: number;
  maxYear: number;
  onClose: () => void;
  calendarClasses?: string;
  ref?: Ref<HTMLDivElement>;
  firstDayOfWeek?: FirstDayOfWeek;
}

export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.

const Calendar = ({
  selectedDate,
  onSelect,
  minYear,
  maxYear,
  onClose,
  calendarClasses,
  ref,
  firstDayOfWeek = 0,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const daysInMonth = getOldDate(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = getOldDate(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      if (currentYear - 1 >= minYear) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      }
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      if (currentYear + 1 <= maxYear) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      }
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const newDate = getOldDate(currentYear, currentMonth, day);
    onSelect(newDate);
    onClose();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const isDisabled = (day: number) => {
    const date = getOldDate(currentYear, currentMonth, day);
    return (
      date < getOldDate(minYear, 0, 1) || date > getOldDate(maxYear, 11, 31)
    );
  };

  // Reorder week days based on firstDayOfWeek
  const reorderedWeekDays = [
    ...WEEK_DAYS.slice(firstDayOfWeek),
    ...WEEK_DAYS.slice(0, firstDayOfWeek),
  ];
  // Calculate empty cells at the start of the grid
  const emptyCells = (firstDayOfMonth - firstDayOfWeek + 7) % 7;

  return (
    <div className={calendarClasses} ref={ref}>
      <div className="flex items-center justify-between mb-4">
        <Button
          type="button"
          variant="empty"
          size="icon"
          onClick={handlePrevMonth}
          disabled={currentYear === minYear && currentMonth === 0}
          className={classNames(
            "h-8 w-8",
            previewsMonthTextColor,
            previewsMonthTextColorHover,
            previewsMonthBackgroundColor,
            previewsMonthBackgroundColorHover,
          )}
        >
          {/* classes for prev < */}
          <svg
            className="h-4 w-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
              className="fill-current"
            />
          </svg>
        </Button>
        {/*//classes for calendar title. ex: January 2026*/}
        <div className={`font-semibold ${monthTextColor}`}>
          {getMonthAndYear(currentYear, currentMonth, 1).toString()}
        </div>
        <Button
          type="button"
          variant="empty"
          size="icon"
          onClick={handleNextMonth}
          disabled={currentYear === maxYear && currentMonth === 11}
          className={classNames(
            "h-8 w-8",
            nextMonthTextColor,
            nextMonthTextColorHover,
            nextMonthBackgroundColor,
            nextMonthBackgroundColorHover,
          )}
        >
          {/* classes for next > */}
          <svg
            className="h-4 w-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
              className="fill-current"
            />
          </svg>
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {reorderedWeekDays.map((day, index) => (
          <div
            key={day + index}
            //classes for week days SMTWTFS
            className={`text-center text-xs font-medium ${weekDaysTextColor}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: emptyCells }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const today = isToday(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => !disabled && handleDateClick(day)}
              disabled={disabled}
              className={classNames(
                "h-8 w-8 rounded-md text-sm font-medium transition-colors",
                selected
                  ? [
                      selectedDayTextColor,
                      selectedDayBackgroundColor,
                      selectedDayTextColorHover,
                      selectedDayBackgroundColorHover,
                    ]
                  : [],
                !selected && !disabled && !today
                  ? [
                      notSelectedNotDisabledDayTextColor,
                      notSelectedNotDisabledDayBackgroundColor,
                      notSelectedNotDisabledDayTextColorHover,
                      notSelectedNotDisabledDayBackgroundColorHover,
                    ]
                  : [],
                disabled
                  ? [
                      disabledDayTextColor,
                      disabledDayBackgroundColor,
                      "cursor-not-allowed",
                    ]
                  : [],
                today && !selected
                  ? [
                      "border",
                      todayTextColor,
                      todayBorderColor,
                      todayBackgroundColor,
                      todayTextColorHover,
                      todayBackgroundColorHover,
                    ]
                  : [],
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
