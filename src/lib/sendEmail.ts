// import { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useEmailStore } from "../stores/useEmailStore";
import { capitalize, getAge, getDateInRomanian } from "./utils";
import { EmailOptionsType } from "./types";

//type EmailOptionsType = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   sex: "masculin" | "feminin";
//   birthDate: string;
//   goal: string;
//   subject?: string;
// };

export function sendEmail({
  firstName,
  lastName,
  email,
  sex,
  birthDate,
  goal,
  subject,
}: EmailOptionsType) {
  const resolvedSubject =
    subject ||
    `Ați primit un mesaj de la ${firstName} ${lastName} interesat de antrenamente cu dumneavoastră.`;

  const { setEmailSent, setErrorMessage } = useEmailStore.getState();

  setEmailSent(false);
  setErrorMessage("");

  //event.preventDefault(); // This is important, the email will not be sent without it

  const serviceId = import.meta.env.VITE_SERVICE_ID as string;
  const templateId = import.meta.env.VITE_TEMPLATE_ID as string;
  const publicKey = import.meta.env.VITE_PUBLIC_KEY as string;

  return emailjs
    .send(
      serviceId,
      templateId,
      {
        from_first_name: firstName,
        from_last_name: lastName,
        from_email: email,
        from_sex: capitalize(sex),
        from_data_nasterii: getDateInRomanian(birthDate),
        from_varsta: getAge(birthDate),
        subject: resolvedSubject,
        from_scop: goal,
      },
      { publicKey },
    )
    .then(
      (result) => {
        console.log("Email sent!");
        console.log("result", result);
        setEmailSent(true);
        setErrorMessage("");
        return result;
      },
      (error) => {
        setEmailSent(false);
        setErrorMessage(error?.text ?? "Eroare la trimiterea emailului.");
        throw error;
      },
    );
}
