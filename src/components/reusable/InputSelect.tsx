import { ChangeEvent,  } from "react";
import { capitalize } from "../../lib/utils";
import { GenderType } from "../../lib/types";
import { useEmailStore } from "../../stores/useEmailStore";

type InputSelectOptionsType = {
  labelText: string;
  options?: string[];
};

export const InputSelect = ({
  labelText,
  options = ["masculin", "feminin"],
}: InputSelectOptionsType) => {

  const setSex = useEmailStore((state) => state.setSex);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as GenderType;
    setSex(value);
  };

  return (
    <label className={`space-y-2 font-medium`}>
      <div className="flex justify-between">
        {labelText}
        {/*{mesajEroare !== "" && <p className="text-red-400">{mesajEroare}</p>}*/}
      </div>
      <div className="flex items-center gap-1 rounded border-2 border-white px-1 py-2">
        <select
          name="gender"
          id="gender"
          className="flex-1 appearance-none bg-primaryVar3 dark:bg-primaryVar3"
          required
          defaultValue={""}
          onChange={handleChange}
          // onBlur={handleBlur}
        >
          {/* disabled */}
          <option value="">Nespecificat</option>
          {options.map((option, index) => (
            <option key={option + index} value={option}>
              {capitalize(option)}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};
