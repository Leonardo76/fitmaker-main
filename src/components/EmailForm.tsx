import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import { mail, user, gender, fitness } from "../assets";
import { InputText } from "./reusable/InputText";
import InputSelect from "./reusable/InputSelect";
import InputDate from "./reusable/InputDate";
import { InputTextarea } from "./reusable/InputTextarea";

import { useErrorStore } from "../stores/useErrorStore";
import { useEmailStore } from "../stores/useEmailStore";

import {
  BIRTHDATE_FORMAT,
  BIRTHDATE_RANGE,
  EMAIL_INVALID,
  EmailOptionsType,
  GOAL_TOO_SHORT,
  makeEmailSubmitSchema,
  NAME_ONLY_LETTERS,
  NAME_TOO_LONG,
  NAME_TOO_SHORT,
  normalizeBirthDateString,
  pickByCodePriority,
  stripValidationCode,
} from "../lib/types";

import { sendEmail } from "../lib/sendEmail";

type EmailFormProps = {
  minYear: number;
  maxYear?: number;
};

export const EmailForm = ({
  minYear,
  maxYear = new Date().getFullYear(),
}: EmailFormProps) => {
  const emailSent = useEmailStore((s) => s.emailSent);
  // NOU: citim reactiv eroarea (este setată în sendEmail.ts la catch)
  const errorMessage = useEmailStore((s) => s.errorMessage);
  // NOU: stare locală pentru "se trimite acum" (spinner)
  const [isSending, setIsSending] = useState(false);

  //când user modifică orice câmp după succes, revenim la starea inițială
  useEffect(() => {
    // ascultăm schimbări în store și resetăm emailSent la prima editare
    let prev = useEmailStore.getState();

    //funcția de curățare (cleanup) pentru useEffect
    return useEmailStore.subscribe((next) => {
      const wasSent = prev.emailSent;
      const isSent = next.emailSent;

      // Dacă tocmai s-a trimis cu succes, începem să monitorizăm editările de după succes
      // (nu resetăm imediat)
      if (!wasSent && isSent) {
        prev = next;
        return; // ieșim doar din callback-ul subscribe
      }

      // Dacă a fost trimis și user schimbă orice câmp relevant -> resetăm culoarea si textul butonului
      if (wasSent) {
        const changed =
          next.firstName !== prev.firstName ||
          next.lastName !== prev.lastName ||
          next.email !== prev.email ||
          next.sex !== prev.sex ||
          next.birthDate !== prev.birthDate ||
          next.goal !== prev.goal ||
          next.subject !== prev.subject;

        if (changed) {
          // VECHE: resetai doar emailSent
          // useEmailStore.getState().setEmailSent(false);

          // NOU: revenim complet la starea inițială a butonului
          useEmailStore.getState().setEmailSent(false);
          useEmailStore.getState().setErrorMessage("");
          setIsSending(false);
        }
      }

      prev = next;
    });
  }, []);

  // Schema este creată o singură dată per render (și refolosită la submit),
  // nu în interiorul handleSubmit (unde s-ar crea la fiecare submit).
  const emailSubmitSchema = useMemo(
    () => makeEmailSubmitSchema(minYear, maxYear),
    [minYear, maxYear],
  );

  // VECHE:
  // const handleSubmit = (event: { preventDefault: () => void }) => { ... void sendEmail(...) }
  //
  // NOU: async ca să putem afișa spinner până se rezolvă promise-ul
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // NU trimitem din nou dacă deja e în curs (previne dublu click)
    if (isSending) return;

    const state = useEmailStore.getState();

    const payload: EmailOptionsType = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      sex: state.sex,
      birthDate: normalizeBirthDateString(state.birthDate),
      goal: state.goal,
      subject: state.subject || undefined,
    };

    const result = emailSubmitSchema.safeParse(payload);

    if (!result.success) {
      // pregătim erori next (gol by default)
      const nextErrors = {
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        birthDateError: "",
        goalError: "",
      };

      const errorsByField: Record<string, string[]> = {};

      for (const issue of result.error.issues) {
        const field = String(issue.path[0] ?? "");
        if (!field) continue;

        if (!errorsByField[field]) errorsByField[field] = [];
        errorsByField[field].push(issue.message);
      }

      const firstNameMsg = pickByCodePriority(errorsByField.firstName, [
        NAME_TOO_SHORT,
        NAME_ONLY_LETTERS,
        NAME_TOO_LONG,
      ]);
      if (firstNameMsg)
        nextErrors.firstNameError = stripValidationCode(firstNameMsg);

      const lastNameMsg = pickByCodePriority(errorsByField.lastName, [
        NAME_TOO_SHORT,
        NAME_ONLY_LETTERS,
        NAME_TOO_LONG,
      ]);
      if (lastNameMsg)
        nextErrors.lastNameError = stripValidationCode(lastNameMsg);

      const emailMsg = pickByCodePriority(errorsByField.email, [EMAIL_INVALID]);
      if (emailMsg) nextErrors.emailError = stripValidationCode(emailMsg);

      const goalMsg = pickByCodePriority(errorsByField.goal, [GOAL_TOO_SHORT]);
      if (goalMsg) nextErrors.goalError = stripValidationCode(goalMsg);

      // birthDate: format/validitate > range
      const birthDateMsg = pickByCodePriority(errorsByField.birthDate, [
        BIRTHDATE_FORMAT,
        BIRTHDATE_RANGE,
      ]);
      if (birthDateMsg)
        nextErrors.birthDateError = stripValidationCode(birthDateMsg);

      useErrorStore.getState().setErrors(nextErrors);
      return;
    }

    // succes: curățăm tot dintr-un foc
    useErrorStore.getState().clearErrors();

    // NOU: resetăm erori vechi + pornim spinner-ul
    useEmailStore.getState().setErrorMessage("");
    setIsSending(true);

    try {
      // NOU: așteptăm confirmarea
      await sendEmail(result.data);
      // succes: sendEmail setează emailSent=true; aici doar oprim spinner-ul
      setIsSending(false);
    } catch {
      // eroare: sendEmail setează errorMessage; aici doar oprim spinner-ul
      setIsSending(false);
    }
  };

  // NOU: stabilim starea butonului (text + culori) în funcție de sending/success/error
  const hasError = !emailSent && !isSending && Boolean(errorMessage);

  const buttonText = isSending
    ? "Se trimite..."
    : emailSent
      ? "Email Trimis"
      : hasError
        ? "Eroare la trimiterea emailului. Reîncercați"
        : "Trimite Email";

  return (
    <form
      className="relative mx-1 flex shrink-0 flex-col gap-2 rounded-xl bg-primaryVar3 p-2 md:mx-3 md:justify-around xl:gap-4 xl:p-4"
      id="join"
      onSubmit={handleSubmit}
    >
      <div className="absolute right-0 top-1/2 -z-10 h-1/2 w-1/2 -translate-y-1/2 rounded-full bg-secondaryVar3 blur-[150px]" />
      <h2 className="text-center text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl mb-5">
        Start Your <span className="text-primary">Journey</span>
      </h2>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:gap-4">
          <InputText
            labelText="First Name"
            placeholder="Enter Your First Name"
            image={user}
            firstName={true}
            typeEmail={false}
          />
          <InputText
            labelText="Last Name"
            placeholder="Enter Your Last Name"
            image={user}
            firstName={false}
            typeEmail={false}
          />
        </div>

        <InputText
          labelText="E-mail"
          placeholder="Enter Your E-mail"
          image={mail}
          firstName={false}
          typeEmail={true}
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:gap-4">
          <InputSelect labelText="Gender" image={gender} />
          <InputDate labelText="Birth Date" />
        </div>

        <InputTextarea
          labelText="What is your goal?"
          image={fitness}
          placeholder="Enter Your Goal"
        />
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <button
          className={classNames(
            "w-full rounded font-semibold p-3 flex items-center justify-center gap-2",
            // 3 stări: sending / success / error(default red)
            isSending ? "bg-primary text-white opacity-90" : "",
            emailSent ? "bg-white text-primary" : "",
            hasError
              ? "bg-primaryLight text-primaryVar4 border border-primaryVar1"
              : "",
            !isSending && !emailSent && !hasError
              ? "bg-primary text-white"
              : "",
          )}
          type="submit"
          disabled={isSending}
        >
          {/* NOU: spinner vizual cât timp se trimite */}
          {isSending && (
            <span
              className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
              aria-hidden="true"
            />
          )}
          <span>{buttonText}</span>
        </button>
      </div>
    </form>
  );
};
