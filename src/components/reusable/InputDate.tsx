import { useEmailStore } from "../../stores/useEmailStore";
import Picker from "./Picker";
import { useErrorStore } from "../../stores/useErrorStore";
import { ValidationSchemas } from "../../lib/types";
import { z } from "zod";

type InputDateProps = {
  labelText: string;
  image?: {};
};

export default function InputDate({ labelText, image }: InputDateProps) {
  // const [mesajEroare, setMesajEroare] = useState("");
  const birthDateError = useErrorStore((state) => state.birthDateError);
  const setBirthDateError = useErrorStore((state) => state.setBirthDateError);
  // const birthDate = useEmailStore((state) => state.birthDate);
  const setBirthDate = useEmailStore((state) => state.setBirthDate);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const valueAsDate = (e.target as HTMLInputElement).valueAsDate;
  //   setBirthDate(getStringDate(valueAsDate));
  // };

  const handlePickerChange = (value: string) => {
    if (!value) {
      // console.log("!value: ", value);
      return;
    }
    // console.log("value: ", value);
    const valueInDate = new Date(value);
    // console.log("valueInDate", valueInDate);

    const validationSchema = ValidationSchemas.birthDate;
    const validateInput = validationSchema.safeParse(valueInDate);

    if (!validateInput.success) {
      //validation failed
      const mesaj = z.treeifyError(validateInput.error).errors[0];

      setBirthDateError(mesaj);
      return;
    }

    //validation OK
    setBirthDateError("");
    setBirthDate(value);
  };

  return (
    <label className={`space-y-2 font-medium`}>
      <div className="flex justify-between">
        {labelText}
        {birthDateError !== "" && (
          <p className="text-red-400">{birthDateError}</p>
        )}
      </div>
      <div className="relative flex items-center justify-center gap-1 rounded border-2 border-white px-1 py-2">
        {/*<input*/}
        {/*  type="date"*/}
        {/*  name="birth_date"*/}
        {/*  id="birth_date"*/}
        {/*  // className="flex grow bg-primaryVar3 outline-none"*/}
        {/*  className="block w-full bg-primaryVar3 outline-none"*/}
        {/*  required*/}
        {/*  onChange={handleChange}*/}
        {/*/>*/}
        <img
          src={image as string}
          alt="-"
          className="absolute left-2 top-minus-[12px]"
        />
        <Picker
          onChange={handlePickerChange}
          className="lg:w-1/2 text-[10px]"
        />
      </div>
    </label>
  );
}
