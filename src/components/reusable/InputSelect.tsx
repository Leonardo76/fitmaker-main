import { ChangeEvent, useEffect, useMemo } from "react";
import { capitalize } from "../../lib/utils";
import { GenderType } from "../../lib/types";
import { useEmailStore } from "../../stores/useEmailStore";

type InputSelectOptionsType = {
  labelText: string;
  image?: {};
  options?: GenderType[];
};

const DEFAULT_SEX: GenderType = "nespecificat";

function isGenderType(value: string): value is GenderType {
  return (
    value === "masculin" || value === "feminin" || value === "nespecificat"
  );
}

export default function InputSelect({
  labelText,
  image,
  options = [DEFAULT_SEX, "masculin", "feminin"],
}: InputSelectOptionsType) {
  const sex = useEmailStore((state) => state.sex);
  const setSex = useEmailStore((state) => state.setSex);

  // Normalizează lista: fără duplicate, doar valori valide, în ordine stabilă
  const normalizedOptions = useMemo(() => {
    const valid: GenderType[] = [];
    for (const opt of options ?? []) {
      if (opt === "masculin" || opt === "feminin" || opt === "nespecificat") {
        if (!valid.includes(opt)) valid.push(opt);
      }
    }
    // fallback: dacă nu mai rămâne nimic, punem default-ul
    return valid.length > 0 ? valid : [DEFAULT_SEX];
  }, [options]);

  // Super-sigur: dacă sex curent nu există în options, îl aducem la o valoare permisă
  useEffect(() => {
    if (normalizedOptions.includes(sex)) return;

    const fallback: GenderType = normalizedOptions.includes(DEFAULT_SEX)
      ? DEFAULT_SEX
      : normalizedOptions[0];

    if (fallback !== sex) setSex(fallback);
  }, [sex, normalizedOptions, setSex]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (isGenderType(value)) setSex(value);
  };

  return (
    <label className={`space-y-2 font-medium `}>
      <div className="flex justify-between items-center">
        {labelText}
        {/*{mesajEroare !== "" && <p className="text-red-400">{mesajEroare}</p>}*/}
      </div>
      <div className="flex items-center gap-1 rounded border-2 border-white px-1 py-2">
        <img src={image as string} alt="-" />
        <select
          name="gender"
          id="gender"
          className="flex-1 appearance-none bg-primaryVar3 dark:bg-primaryVar3 focus:outline-none focus:border-r"
          required
          value={normalizedOptions.includes(sex) ? sex : normalizedOptions[0]}
          onChange={handleChange}
        >
          {normalizedOptions.map((option, index) => (
            <option key={option + index} value={option}>
              {capitalize(option)}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
