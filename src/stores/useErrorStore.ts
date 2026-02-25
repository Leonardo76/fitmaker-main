import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// type FormErrors = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   birthDate: string;
//   goal: string;
// };

type ErrorFields = {
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  birthDateError: string;
  goalError: string;
};

type ErrorStateType = ErrorFields & {
  setFirstNameError: (firstNameError: string) => void;
  setLastNameError: (lastNameError: string) => void;
  setEmailError: (emailError: string) => void;
  // setGenderError: (genderError: string) => void; //
  setBirthDateError: (birthDateError: string) => void; //
  setGoalError: (goalError: string) => void;

  setErrors: (errors: Partial<ErrorFields>) => void;
  clearErrors: () => void;
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
      goalError: "",
      setGoalError: (goalError: string) =>
        set((state) => {
          state.goalError = goalError;
        }),

      setErrors: (errors) =>
        set((state) => {
          if (errors.firstNameError !== undefined)
            state.firstNameError = errors.firstNameError;
          if (errors.lastNameError !== undefined)
            state.lastNameError = errors.lastNameError;
          if (errors.emailError !== undefined)
            state.emailError = errors.emailError;
          if (errors.birthDateError !== undefined)
            state.birthDateError = errors.birthDateError;
          if (errors.goalError !== undefined)
            state.goalError = errors.goalError;
        }),

      clearErrors: () =>
        set((state) => {
          state.firstNameError = "";
          state.lastNameError = "";
          state.emailError = "";
          state.birthDateError = "";
          state.goalError = "";
        }),
    })),
  ),
);
