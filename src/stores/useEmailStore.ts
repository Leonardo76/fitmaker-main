import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { getCurrentDate } from "../lib/utils";
import { devtools } from "zustand/middleware";
import { GenderType } from "../lib/types";

type EmailState = {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  sex: GenderType;
  setSex: (sex: GenderType) => void;
  birthDate: string;
  setBirthDate: (birthDate: string) => void;
  goal: string;
  setGoal: (goal: string) => void;
  subject: string;
  setSubject: (subject: string) => void;
  emailSent: boolean;
  setEmailSent: (sent: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};

export const useEmailStore = create<EmailState>()(
  devtools(
    immer((set) => ({
      firstName: "",
      setFirstName: (newFirstName: string) =>
        set((state) => {
          state.firstName = newFirstName;
        }),
      lastName: "",
      setLastName: (newLastName: string) =>
        set((state) => {
          state.lastName = newLastName;
        }),
      email: "",
      setEmail: (newEmail: string) =>
        set((state) => {
          state.email = newEmail;
        }),
      sex: "nespecificat",
      setSex: (newSex: GenderType) =>
        set((state) => {
          state.sex = newSex;
        }),
      birthDate: "9999/09/09", //getCurrentDate(),
      setBirthDate: (newBirthDate: string) =>
        set((state) => {
          state.birthDate = newBirthDate;
        }),
      goal: "",
      setGoal: (newGoal: string) =>
        set((state) => {
          state.goal = newGoal;
        }),
      subject: "",
      setSubject: (newSubject: string) =>
        set((state) => {
          state.subject = newSubject;
        }),
      emailSent: false,
      setEmailSent: (newEmailSent: boolean) =>
        set((state) => {
          state.emailSent = newEmailSent;
        }),
      errorMessage: "",
      setErrorMessage: (newErrorMessage: string) =>
        set((state) => {
          state.errorMessage = newErrorMessage;
        }),
    })),
  ),
);
