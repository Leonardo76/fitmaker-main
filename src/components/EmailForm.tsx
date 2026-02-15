import { mail, user, gender, birthDate, fitness } from "../assets";
import { MouseEvent } from "react";
import { InputText } from "./reusable/InputText";
import { InputSelect } from "./reusable/InputSelect";
import InputDate from "./reusable/InputDate";
import { InputTextarea } from "./reusable/InputTextarea";

//DE IMPLEMENTAT ZOD

// const param: EmailOptionsType = {
//   firstName: "Leonardo",
//   lastName: "Cernaianu",
//   email: "test@test.com",
//   sex: "masculin",
//   birthDate: "2000/4/14",
//   goal: "In prezent, am 80kg. As dori sa fac un antrenament pentru a slabi minim 10kg.",
//   subject: "Client pentru antrenor personal.",
// };

// useSendEmail(param);

export const EmailForm = () => {
  // const firstName = useEmailStore((state) => state.firstName);
  // const lastName = useEmailStore((state) => state.lastName);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="relative mx-1 flex shrink-0 flex-col gap-2 rounded-xl bg-primaryVar3 p-2 md:mx-3 md:justify-around xl:gap-4 xl:p-4"
      id="join"
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
          <InputDate labelText="Birth Date" image={birthDate} />
        </div>
        <InputTextarea
          labelText="What is your goal?"
          image={fitness}
          placeholder="Enter Your Goal"
        />
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <button
          className="w-full rounded bg-primary p-3 font-medium"
          onClick={handleClick}
        >
          Send email
        </button>
      </div>
    </div>
  );
};
