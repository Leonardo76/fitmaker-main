import { contactInfo } from "../lib/constants";
import Logo from "./reusable/Logo";
import ContactItem from "./reusable/ContactItem";

const Footer = () => {
  return (
    <section
      className={`bg-grey mx-1 py-8 md:mx-3 lg:py-10 xl:py-12`}
      id="contact"
    >
      <div className="container flex gap-6 max-md:flex-col md:justify-between md:gap-5">
        <div className="flex-1 space-y-4 xl:space-y-6">
          <Logo />
          <p className="text-justify text-greyText continut-text">
            Transformă-ți corpul alături de Eduard Bălăiță, partenerul tău de
            încredere în fitness. Cu peste{" "}
            <span className="text-primary">14 ani</span> de experiență, ofer
            îndrumare de specialitate, planuri de antrenament personalizate și
            ghidare nutrițională completă.{" "}
            <span className="text-secondary">Alătură-te comunității mele</span>{" "}
            și începe-ți călătoria către o versiune mai sănătoasă și mai
            puternică a ta. Ești gata să faci o schimbare?
          </p>
        </div>

        <div className="md:w-fit md:shrink-0">
          <div className="flex flex-col items-start space-y-3 md:space-y-6 text-left xl:space-y-9">
            <div className="text-base font-medium text-primaryVar5 xl:text-2xl xl:font-bold">
              Contact
            </div>
            <div className="flex flex-col gap-5 xl:gap-6">
              {contactInfo.map((info, i) => (
                <ContactItem
                  key={i}
                  icon={info.icon}
                  info={info.info}
                  link={info.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
