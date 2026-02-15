import { useEffect, useRef, useState } from "react";
import { birthDatePlaceholders } from "../../lib/constants";
import Input from "./Input";

import { DatePickerOptions } from "../../lib/types";

const Picker = ({
  placeHolders = birthDatePlaceholders,
  value,
  className = "",
  onChange,
  ...props
}: DatePickerOptions) => {
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
  return (
    <div
      className={`inline-block overflow-hidden ${className}`}
      style={props.style}
    >
      <div className={"w-full flex flex-row"}>
        <Input
          ref={dayRef}
          handleChange={handleChange}
          value={day}
          style={props.inputStyle}
          placeholder={placeHolders[0]}
          name={"rbday"}
        />
        <Input
          ref={monthRef}
          handleChange={handleChange}
          value={month}
          style={props.inputStyle}
          placeholder={placeHolders[1]}
          name={"rbmonth"}
        />
        <Input
          ref={yearRef}
          handleChange={handleChange}
          value={year}
          style={props.inputStyle}
          placeholder={placeHolders[2]}
          name={"rbyear"}
        />
      </div>
    </div>
  );
};

export default Picker;
