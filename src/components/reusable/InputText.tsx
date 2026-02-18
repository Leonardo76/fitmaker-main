import { ChangeEvent } from "react";
import { z } from "zod";
import { ValidationSchemas } from "../../lib/types";
import { capitalize, getRidOfDiacritics } from "../../lib/utils";
import { useEmailStore } from "../../stores/useEmailStore";
import { useErrorStore } from "../../stores/useErrorStore";

type InputTextProps = {
  labelText: string;
  image?: {};
  placeholder?: string;
  typeEmail?: boolean;
  firstName?: boolean;
};

export const InputText = ({
  labelText,
  image,
  placeholder,
  typeEmail = false,
  firstName = true,
}: InputTextProps) => {
  const setFirstName = useEmailStore((state) => state.setFirstName);
  const setLastName = useEmailStore((state) => state.setLastName);
  const setEmail = useEmailStore((state) => state.setEmail);

  const firstNameError = useErrorStore((state) => state.firstNameError);
  const lastNameError = useErrorStore((state) => state.lastNameError);
  const emailError = useErrorStore((state) => state.emailError);
  const setFirstNameError = useErrorStore((state) => state.setFirstNameError);
  const setLastNameError = useErrorStore((state) => state.setLastNameError);
  const setEmailError = useErrorStore((state) => state.setEmailError);

  const mesajEroare = typeEmail
    ? emailError
    : firstName
      ? firstNameError
      : lastNameError;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const initialValue = (e.target as HTMLInputElement).value.trim();

    if (typeEmail) {
      setEmailError("");
      setEmail("");
    } else if (firstName) {
      setFirstNameError("");
      setFirstName("");
    } else {
      setLastNameError("");
      setLastName("");
    }

    if (initialValue === "") {
      return;
    }

    const valueWithoutDiacritics: string = typeEmail
      ? initialValue
      : getRidOfDiacritics(initialValue);

    const validationSchema = typeEmail
      ? ValidationSchemas.email
      : ValidationSchemas.nume;

    const validateInput = validationSchema.safeParse(valueWithoutDiacritics);
    if (!validateInput.success) {
      //validation failed
      const mesaj = z.treeifyError(validateInput.error).errors[0];

      if (typeEmail) {
        setEmailError(mesaj);
      } else if (firstName) {
        setFirstNameError(mesaj);
      } else {
        setLastNameError(mesaj);
      }
      return;
    }

    //validation OK
    if (typeEmail) {
      setEmail(initialValue);
    } else if (firstName) {
      setFirstName(capitalize(initialValue));
    } else {
      setLastName(capitalize(initialValue));
    }
  };

  return (
    <label className={`space-y-2 font-medium`}>
      <div className="flex justify-between items-center">
        {labelText}
        {mesajEroare !== "" && (
          <p className="text-red-400 text-xs">{mesajEroare}</p>
        )}
      </div>
      <div className="flex items-center gap-1 rounded border-2 border-white px-1 py-2">
        <img src={image as string} alt="-" />
        <input
          type="text"
          name={labelText}
          className={`w-full bg-primaryVar3 px-2  outline-none focus:border-r`}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </label>
  );
};
