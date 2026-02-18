import * as React from "react";
import { ChangeEvent } from "react";
import { useEmailStore } from "../../stores/useEmailStore";
import { useErrorStore } from "../../stores/useErrorStore";
import { ValidationSchemas } from "../../lib/types";
import { z } from "zod";

type InputTextareaProps = {
  labelText: string;
  image?: {};
  placeholder?: string;
};

export const InputTextarea = ({
  labelText,
  image,
  placeholder,
}: InputTextareaProps) => {
  const setGoal = useEmailStore((state) => state.setGoal);

  const goalError = useErrorStore((state) => state.goalError);
  const setGoalError = useErrorStore((state) => state.setGoalError);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const value = (e.target as HTMLTextAreaElement).value.trim();

    setGoalError("");
    setGoal("");

    if (value === "") {
      return;
    }

    const validationSchema = ValidationSchemas.goal;
    const validateInput = validationSchema.safeParse(value);
    if (!validateInput.success) {
      //validation failed
      const mesaj = z.treeifyError(validateInput.error).errors[0];

      setGoalError(mesaj);
      return;
    }

    //validation OK
    setGoal(value);
  };

  return (
    <label className={`space-y-2 font-medium`}>
      <div className="flex justify-between items-center">
        {labelText}
        {goalError !== "" && (
          <p className="text-red-400 text-xs">{goalError}</p>
        )}
      </div>
      <div className="flex items-center gap-1 rounded border-2 border-white px-1 py-2">
        <img src={image as string} alt="-" />
        <textarea
          className={`flex-1 resize-none bg-primaryVar3 px-2 outline-none focus:border-r`}
          placeholder={placeholder}
          name={labelText}
          rows={3}
          cols={20}
          wrap="soft"
          maxLength={250}
          spellCheck="false"
          onChange={handleChange}
        />
      </div>
    </label>
  );
};
