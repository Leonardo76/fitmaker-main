import { RefObject } from "react";
import Calendar from "./ui/Calendar";
import { calendarBackgroundColor, calendarBorderColor } from "../lib/constants";

type DateChooserCalendarProps = {
  isCalendarOpen: boolean;
  calendarRef: RefObject<HTMLDivElement | null>;
  selectedDate: Date;
  minYear: number;
  maxYear: number;
  onSelect: (date: Date) => void;
  onClose: () => void;
};

export default function DateChooserCalendar({
  isCalendarOpen,
  calendarRef,
  selectedDate,
  minYear,
  maxYear,
  onSelect,
  onClose,
}: DateChooserCalendarProps) {
  if (!isCalendarOpen) {
    return null;
  }

  return (
    <Calendar
      ref={calendarRef}
      calendarClasses={`absolute top-full mt-2 z-50 rounded-lg border p-4 shadow-lg w-72 w-full lg:w-fit ${calendarBorderColor} ${calendarBackgroundColor}`}
      selectedDate={selectedDate}
      onSelect={onSelect}
      minYear={minYear}
      maxYear={maxYear}
      onClose={onClose}
    />
  );
}
