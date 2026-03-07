import DateChooser from "../InputSwitcher/components/DateChooser";

type InputDateProps = {
  labelText: string;
};

export default function InputDate({ labelText }: InputDateProps) {
  return (
    <label className={`space-y-2 font-medium`}>
      <div className="flex justify-between items-center text-sm lg:text-base">
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
          classNameDay="md:text-end continut-text"
          classNameMonth="continut-text"
          classNameYear="md:text-start continut-text"
          // dateFormat={[DAY, MONTH, YEAR]}
          // useCalendar={false}
        />
      </div>
    </label>
  );
}
