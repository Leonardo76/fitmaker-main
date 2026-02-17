import { KeyboardEvent, RefObject, useEffect, useRef, useState } from "react";
import { birthDatePlaceholders } from "../../lib/constants";
import InputPicker from "./InputPicker";

import { DatePickerOptions } from "../../lib/types";

const Picker = ({
  placeHolders = birthDatePlaceholders,
  value,
  className = "",
  onChange,
  ...props
}: DatePickerOptions) => {
  // const input1Ref = useRef<HTMLInputElement | null>(null);
  // const input2Ref = useRef<HTMLInputElement | null>(null);
  // const input3Ref = useRef<HTMLInputElement | null>(null);

  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  useEffect(() => {
    if (value) {
      setDay(value[0]);
      setMonth(value[1]);
      setYear(value[2]);
    }
  }, [value]);
  useEffect(() => {
    if (day && month && year && year.length === 4 && onChange) {
      const momentString = `${year}/${month}/${day}`;
      onChange && onChange(momentString);
    } else {
      onChange && onChange(undefined);
    }
  }, [day, month, year]);
  const handleChange = (value: string, name: string) => {
    switch (name) {
      case "rbday":
        setDay(value);
        if (Number(value) > 3 || value?.length === 2) {
          monthRef.current && monthRef.current.focus();
        }
        break;
      case "rbmonth":
        setMonth(value);
        if (!month && !value) {
          dayRef.current && dayRef.current.focus();
        }
        if (Number(value) > 1 || value?.length === 2) {
          yearRef.current && yearRef.current.focus();
        }
        break;
      case "rbyear":
        if (!year && !value) {
          monthRef.current && monthRef.current.focus();
        }
        if (value?.length === 4) {
          yearRef.current && yearRef.current.blur();
        }
        setYear(value);
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    inputRef: RefObject<HTMLInputElement>,
    nextInputRef: RefObject<HTMLInputElement>,
    prevInputRef: RefObject<HTMLInputElement>,
  ) => {
    if (
      event.key === "ArrowRight" &&
      inputRef.current &&
      inputRef.current.selectionStart === inputRef.current.value.length
    ) {
      nextInputRef.current?.focus();
      nextInputRef.current?.setSelectionRange(0, 0); // Setează cursorul la început
      event.preventDefault();
    } else if (
      event.key === "ArrowLeft" &&
      inputRef.current &&
      inputRef.current.selectionStart === 0
    ) {
      prevInputRef.current?.focus();
      prevInputRef.current?.setSelectionRange(
        prevInputRef.current.value.length,
        prevInputRef.current.value.length,
      ); // Setează cursorul la sfârșit
      //event.preventDefault();
    }
  };
  return (
    <div
      className={`inline-block overflow-hidden ${className}`}
      style={props.style}
    >
      <div className={"w-full flex flex-row"}>
        <InputPicker
          ref={dayRef}
          handleChange={handleChange}
          value={day}
          style={props.inputStyle}
          placeholder={placeHolders[0]}
          name={"rbday"}
          onKeyDown={(event) => handleKeyDown(event, dayRef, monthRef, yearRef)}
        />
        <InputPicker
          ref={monthRef}
          handleChange={handleChange}
          value={month}
          style={props.inputStyle}
          placeholder={placeHolders[1]}
          name={"rbmonth"}
          onKeyDown={(event) => handleKeyDown(event, monthRef, yearRef, dayRef)}
        />
        <InputPicker
          ref={yearRef}
          handleChange={handleChange}
          value={year}
          style={props.inputStyle}
          placeholder={placeHolders[2]}
          name={"rbyear"}
          onKeyDown={(event) => handleKeyDown(event, yearRef, dayRef, monthRef)}
        />
      </div>
    </div>
  );
};

export default Picker;
