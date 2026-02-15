import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ErrorStateType = {
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  // genderError: string;
  birthDateError: string;
  goalError: string;
  setFirstNameError: (firstNameError: string) => void;
  setLastNameError: (lastNameError: string) => void;
  setEmailError: (emailError: string) => void;
  // setGenderError: (genderError: string) => void; //
  setBirthDateError: (birthDateError: string) => void; //
  setGoalError: (goalError: string) => void;
};

export const useErrorStore = create<ErrorStateType>()(
  devtools(
    immer((set) => ({
      firstNameError: "",
      setFirstNameError: (firstNameError: string) =>
        set((state) => {
          state.firstNameError = firstNameError;
        }),
      lastNameError: "",
      setLastNameError: (lastNameError: string) =>
        set((state) => {
          state.lastNameError = lastNameError;
        }),
      emailError: "",
      setEmailError: (emailError: string) =>
        set((state) => {
          state.emailError = emailError;
        }),
      // genderError: "",
      // setGenderError: (genderError: string) =>
      //   set((state) => {
      //     state.genderError = genderError;
      //   }),
      birthDateError: "",
      setBirthDateError: (birthDateError: string) =>
        set((state) => {
          state.birthDateError = birthDateError;
        }),
      // goalError: "",
      // setGoalError: (goalError: string) =>
      //   set((state) => {
      //     state.goalError = goalError;
      //   }),
    })),
  ),
);
