// import { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useEmailStore } from "../stores/useEmailStore";
import { capitalize, getAge, getDateInRomanian } from "../lib/utils";
import { EmailOptionsType } from "../lib/types";

//type EmailOptionsType = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   sex: "masculin" | "feminin";
//   birthDate: string;
//   goal: string;
//   subject?: string;
// };

export function useSendEmail({
  firstName,
  lastName,
  email,
  sex,
  birthDate,
  goal,
  subject,
}: EmailOptionsType) {
  if (!subject) {
    subject = `Ați primit un mesaj de la ${firstName} ${lastName} interesat de antrenamente cu dumneavoastră.`;
  }

  // const emailSent = useEmailStore((state) => state.emailSent);
  const setEmailSent = useEmailStore((state) => state.setEmailSent);
  // const errorMessage = useEmailStore((state) => state.errorMessage);
  const setErrorMessage = useEmailStore((state) => state.setErrorMessage);

  setEmailSent(false);
  setErrorMessage("");

  //event.preventDefault(); // This is important, the email won't send without it

  // @ts-ignore
  const serviceId: string = import.meta.env.VITE_SERVICE_ID;
  // @ts-ignore
  const templateId: string = import.meta.env.VITE_TEMPLATE_ID;
  // @ts-ignore
  const publicKey: string = import.meta.env.VITE_PUBLIC_KEY;

  emailjs
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
        subject: subject,
        from_scop: goal,
      },
      {
        publicKey: publicKey,
      },
    )
    .then(
      (result) => {
        console.log("Email sent!");
        console.log("result", result);
        setEmailSent(true);
        setErrorMessage("");

        // window.location.reload(); // This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
      },
      (error) => {
        // console.log(error.text);
        setEmailSent(false);
        setErrorMessage(error.text);
      },
    );
}

