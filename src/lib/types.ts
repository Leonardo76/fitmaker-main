import { z } from "zod";
import { CSSProperties } from "react";

export type EmailOptionsType = {
  firstName: string;
  lastName: string;
  email: string;
  sex: GenderType;
  birthDate: string;
  goal: string;
  subject?: string;
};

export type GenderType = "masculin" | "feminin" | "nespecificat";

export const ValidationSchemas = {
  nume: z
    .string()
    .trim()
    .regex(/^[a-zA-Z]+$/, "Introduceti doar litere")
    .min(2, "Introduceti cel putin 2 litere")
    .max(20, "Introduceti cel mult 20 de litere"),
  email: z.email("Introduceti o adresa de email valida"),
  goal: z.string().trim().min(5, "Trebuie cel putin 5 litere"),
  // sex: z.literal(["masculin", "feminin"]),
  birthDate: z.coerce
    .date()
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), {
      message: "Nu mai batran de 100 de ani",
    })
    .max(new Date(), { message: "Doar persoane deja nascute" }),
};

export interface DatePickerOptions {
  placeHolders?: string[];
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  className?: string;
  onChange?: (value: string | null) => void;
  value?: [string, string, string];
}
