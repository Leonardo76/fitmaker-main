import { z } from "zod";

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
  birthDate: z.date(),
};
