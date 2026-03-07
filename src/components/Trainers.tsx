// import { useRef } from "react";
// import {
//   arrowLeftWhite,
//   arrowRight,
//   arrowRightWhite,
//   chevronRight,
// } from "../assets";
import { trainers } from "../lib/constants";

import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Trainers = () => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const containerRef = useRef();

  // const amount = window.innerWidth - window.innerWidth / 2;

  // const handleScroll = (scrollAmount:number) => {
  //   if (!containerRef.current) return;
  //
  //   const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
  //
  //   const maxScrollLeft = scrollWidth - clientWidth;
  //   const newScrollPosition = Math.min(
  //     Math.max(scrollLeft + scrollAmount, 0),
  //     maxScrollLeft,
  //   );
  //
  //   setScrollPosition(newScrollPosition);
  //   containerRef.current.scrollLeft = newScrollPosition;
  // };
  return (
    <section className={`py-8 lg:py-10 xl:py-12`} id="trainer">
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container space-y-4 xl:space-y-6 flex flex-col items-center "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-center w-full titlu-capitol-text">
            Despre <span className="text-primary">Antrenor</span>
          </h2>
        </div>
        <div className="flex items-center justify-center gap-3 pb-1 lg:gap-6 xl:gap-10 max-w-2xl">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className=" flex flex-col md:flex-row py-3 rounded-xl bg-greyLight px-3 drop-shadow-sm gap-3 justify-center w-full items-center"
            >
              <div className="flex shrink-0 flex-col rounded-xl items-center justify-center">
                <img src={trainer.image} alt="" className="w-85 h-auto" />
                <div className="space-y-3 rounded-xl bg-greyLight px-3 drop-shadow-sm mt-3 flex flex-col items-center justify-center">
                  <h3 className="subtitlu-capitol-text">{trainer.name}</h3>
                  <p className="font-medium text-greyTextVar1 continut-text">
                    {trainer.role}
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-wrap text-justify continut-text">
                {trainer.about}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Trainers;
