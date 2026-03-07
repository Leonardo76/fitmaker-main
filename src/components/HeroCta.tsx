import { MouseEvent } from "react";
import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";
const HeroCta = () => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      variants={revealVar}
      initial="hidden"
      animate="visible"
      className="space-y-4 max-lg:col-span-2 lg:row-start-2 lg:space-y-6 xl:space-y-9"
    >
      <div className="continut-text text-justify text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        "Alătură-te comunității și începe chiar acum transformarea ta. Cu
        ajutorul antrenorului nostru și al programelor personalizate vei putea
        să îți atingi obiectivele și să devii cea mai bună versiune a ta. Ești
        pregătit să faci primul pas?"
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          className="w-full rounded-xl bg-primary py-3 text-sm font-light lg:rounded-2xl lg:text-base lg:font-medium xl:rounded-[20px] xl:text-lg"
          onClick={(event) => handleClick(event, "join")}
        >
          {/*join*/}
          Începe transformarea
        </button>
        <button
          className="w-full rounded-xl border border-secondary bg-transparent py-3 text-sm font-light text-secondary lg:rounded-2xl lg:text-base lg:font-medium xl:rounded-[20px] xl:text-lg"
          onClick={(event) => handleClick(event, "services")}
        >
          {/*services*/}
          Explorează opțiunile
        </button>
      </div>
    </motion.div>
  );
};

export default HeroCta;
