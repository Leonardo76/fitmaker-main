import {
  KeyboardEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEmailStore } from "../../../stores/useEmailStore";
import { useErrorStore } from "../../../stores/useErrorStore";
import { makeBirthDateSchema, stripValidationCode } from "../../../lib/types";
import { DateChooserProps, DAY, MONTH, TimeFields, YEAR } from "../lib/types";
import { getMaxDays } from "../utils/utils";
import { useDateChooserInput } from "./useDateChooserInput";
import { useDateChooserKeyboard } from "./useDateChooserKeyboard";

type UseDateChooserParams = {
  minYear: number;
  maxYear: number;
  dateFormat?: DateChooserProps["dateFormat"];
  useCalendar: boolean;
};

type UseDateChooserReturn = {
  calendarRef: RefObject<HTMLDivElement | null>;
  dateFormatResolved: TimeFields[];
  inputMapping: Record<TimeFields, RefObject<HTMLInputElement | null>>;
  day: string;
  month: string;
  year: string;
  isCalendarOpen: boolean;
  handleChange: ReturnType<typeof useDateChooserInput>["handleChange"];
  handleFocus: ReturnType<typeof useDateChooserInput>["handleFocus"];
  handleKeyDownWrapper: (
    event: KeyboardEvent<HTMLInputElement>,
    field: TimeFields,
  ) => void;
  handleButtonKeyDown: (event: KeyboardEvent) => void;
  handleCalendarSelect: (date: Date) => void;
  toggleCalendar: () => void;
  closeCalendar: () => void;
};

export function useDateChooser({
  minYear,
  maxYear,
  dateFormat,
  useCalendar,
}: UseDateChooserParams): UseDateChooserReturn {
  const inputDayRef = useRef<HTMLInputElement | null>(null);
  const inputMonthRef = useRef<HTMLInputElement | null>(null);
  const inputYearRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [day, setDay] = useState<string>("01");
  const [month, setMonth] = useState<string>("01");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<string>(currentYear.toString());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const birthDateInStore = useEmailStore((state) => state.birthDate);
  const setBirthDate = useEmailStore((state) => state.setBirthDate);
  const setBirthDateError = useErrorStore((state) => state.setBirthDateError);

  const dateFormatResolved = dateFormat ?? [DAY, MONTH, YEAR];

  const inputMapping: Record<TimeFields, RefObject<HTMLInputElement | null>> = {
    [DAY]: inputDayRef,
    [MONTH]: inputMonthRef,
    [YEAR]: inputYearRef,
  };

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

  const { handleChange, handleFocus } = useDateChooserInput({
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
  });

  const { handleKeyDownWrapper } = useDateChooserKeyboard({
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
  });

  const toggleCalendar = () => {
    setIsCalendarOpen(useCalendar && !isCalendarOpen);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  return {
    calendarRef,
    dateFormatResolved,
    inputMapping,
    day,
    month,
    year,
    isCalendarOpen,
    handleChange,
    handleFocus,
    handleKeyDownWrapper,
    handleButtonKeyDown,
    handleCalendarSelect,
    toggleCalendar,
    closeCalendar,
  };
}
