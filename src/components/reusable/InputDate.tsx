// import { useEmailStore } from "../../stores/useEmailStore";
// import Picker from "./Picker";
// import { useErrorStore } from "../../stores/useErrorStore";
// import { ValidationSchemas } from "../../lib/types";
// import { z } from "zod";
import DateChooser from "../InputSwitcher/components/DateChooser";

type InputDateProps = {
  labelText: string;
};

export default function InputDate({ labelText }: InputDateProps) {
  // const birthDateError = useErrorStore((state) => state.birthDateError);
  // const setBirthDateError = useErrorStore((state) => state.setBirthDateError);
  // const birthDate = useEmailStore((state) => state.birthDate);
  // const setBirthDate = useEmailStore((state) => state.setBirthDate);

  // const handlePickerChange = (value: string) => {
  //   if (!value) {
  //     return;
  //   }
  //   const valueInDate = new Date(value);
  //
  //   const validationSchema = ValidationSchemas.birthDate;
  //   const validateInput = validationSchema.safeParse(valueInDate);
  //
  //   if (!validateInput.success) {
  //     //validation failed
  //     const mesaj = z.treeifyError(validateInput.error).errors[0];
  //
  //     setBirthDateError(mesaj);
  //     return;
  //   }
  //
  //   //validation OK
  //   setBirthDateError("");
  //   setBirthDate(value);
  // };

  return (
    <label className={`space-y-2 font-medium`}>
      <div className="flex justify-between items-center">
        {labelText}
        {/*{birthDateError !== "" && (*/}
        {/*  <p className="text-red-400 text-xs">{birthDateError}</p>*/}
        {/*)}*/}
      </div>
      <div className="relative flex items-center justify-center gap-1 rounded border-2 border-white px-1 py-2">
        <DateChooser
          minYear={1926}
          maxYear={2026}
          classNameContainer="flex justify-center items-center align-middle"
          classNameDay="md:text-end"
          classNameMonth=""
          classNameYear="md:text-start"
          // dateFormat={[DAY, MONTH, YEAR]}
          // useCalendar={false}
        />
      </div>
    </label>
  );
}
