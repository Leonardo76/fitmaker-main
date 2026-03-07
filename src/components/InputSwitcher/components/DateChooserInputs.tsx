import { ChangeEvent, KeyboardEvent, RefObject } from "react";
import Button from "./ui/Button";
import { calendar } from "../assets";
import { DAY, MONTH, TimeFields } from "../lib/types";

type DateChooserInputsProps = {
  dateFormat: TimeFields[];
  inputMapping: Record<TimeFields, RefObject<HTMLInputElement | null>>;
  day: string;
  month: string;
  year: string;
  minYear: number;
  maxYear: number;
  classNameDay?: string;
  classNameMonth?: string;
  classNameYear?: string;
  isCalendarOpen: boolean;
  useCalendar: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    inputRef: RefObject<HTMLInputElement | null>,
  ) => void;
  onFocus: (inputRef: RefObject<HTMLInputElement | null>) => void;
  onKeyDown: (
    event: KeyboardEvent<HTMLInputElement>,
    field: TimeFields,
  ) => void;
  onButtonKeyDown: (event: KeyboardEvent) => void;
  onToggleCalendar: () => void;
};

export default function DateChooserInputs({
  dateFormat,
  inputMapping,
  day,
  month,
  year,
  minYear,
  maxYear,
  classNameDay,
  classNameMonth,
  classNameYear,
  isCalendarOpen,
  useCalendar,
  onChange,
  onFocus,
  onKeyDown,
  onButtonKeyDown,
  onToggleCalendar,
}: DateChooserInputsProps) {
  return (
    <div className="flex gap-2 flex-col justify-center align-middle items-center">
      <div className="flex items-center">
        <div className="flex w-full">
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
              className={`w-full text-center outline-none ${
                field === DAY
                  ? classNameDay
                  : field === MONTH
                    ? classNameMonth
                    : classNameYear
              }`}
              onChange={(event) => onChange(event, inputMapping[field])}
              onKeyDown={(event) => onKeyDown(event, field)}
              onFocus={() => onFocus(inputMapping[field])}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="icon"
          size="icon"
          onClick={onToggleCalendar}
          className={
            isCalendarOpen ? "scale-125 border-l border-r border-white" : ""
          }
          onKeyDown={onButtonKeyDown}
        >
          {useCalendar && (
            <img src={calendar as string} alt="Calendar" className="" />
          )}
        </Button>
      </div>
    </div>
  );
}
