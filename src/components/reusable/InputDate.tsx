import { ChangeEvent } from "react";
import { getStringDate } from "../../lib/utils";
import { useEmailStore } from "../../stores/useEmailStore";

type InputDateProps = {
  labelText: string;
};

export default function InputDate({labelText }: InputDateProps) {
  // const [mesajEroare, setMesajEroare] = useState("");

  const setBirthDate = useEmailStore((state) => state.setBirthDate);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueAsDate = (e.target as HTMLInputElement).valueAsDate;
    setBirthDate(getStringDate(valueAsDate));
  };

  return (
    <label className={`space-y-2 font-medium`}>
      <div className="flex justify-between">
        {labelText}
        {/*{mesajEroare !== "" && <p className="text-red-400">{mesajEroare}</p>}*/}
      </div>
      <div className="flex items-center gap-1 rounded border-2 border-white px-1 py-2">
        <input
          type="date"
          name="birth_date"
          id="birth_date"
          className="flex grow justify-between bg-primaryVar3 outline-none"
          required
          onChange={handleChange}
        />
      </div>
    </label>
  );
}
