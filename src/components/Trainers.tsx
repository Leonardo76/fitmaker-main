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
          <h2 className="text-center w-full text-xl font-semibold mx-1 md:mx-3 lg:text-2xl lg:font-bold xl:text-3xl">
            Meet the <span className="text-primary">Trainer</span>
          </h2>
          {/*<div className="flex items-center gap-2">*/}
          {/*  <button onClick={() => handleScroll(-amount)}>*/}
          {/*    <img*/}
          {/*      src={arrowLeftWhite}*/}
          {/*      alt="-"*/}
          {/*      className="rounded-[4px] border-2 border-white px-4 py-2"*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*  <button onClick={() => handleScroll(amount)}>*/}
          {/*    <img*/}
          {/*      src={arrowRightWhite}*/}
          {/*      alt="-"*/}
          {/*      className="rounded-[4px] border-2 border-white px-4 py-2"*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
        {/*<p className="text-center text-xs lg:text-sm xl:text-base">*/}
        {/*  At This Part you can See Some Of our Trainers And They’re Work’s.*/}
        {/*</p>*/}
        <div
          // ref={containerRef}
          className="flex items-center justify-center gap-3 pb-1 lg:gap-6 xl:gap-10 max-w-2xl"
        >
          {/*<div className="absolute bottom-2 left-0 h-1/3 w-1/2 rounded-full bg-primaryVar5 blur-[350px]" />*/}
          {/*<div className="absolute bottom-2 right-0 h-1/3 w-1/2 rounded-full bg-secondaryVar3 blur-[350px]" />*/}
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className=" flex flex-col md:flex-row py-3 rounded-xl bg-greyLight px-3 drop-shadow-sm gap-3 justify-center w-full items-center"
            >
              <div className="flex shrink-0 flex-col rounded-xl items-center justify-center">
                <img
                  src={trainer.image}
                  alt=""
                  className="size-70  xl:size-70.25"
                />
                <div className="space-y-3 rounded-xl bg-greyLight px-3 drop-shadow-sm mt-3 flex flex-col items-center justify-center">
                  <h3 className="font-medium xl:text-2xl xl:font-bold">
                    {trainer.name}
                  </h3>
                  <p className="text-xs font-medium text-greyTextVar1 lg:text-sm xl:text-base">
                    {trainer.role}
                  </p>

                  {/*<button className="relative flex items-center gap-1">*/}
                  {/*  <div*/}
                  {/*    className={`absolute left-0 z-10 size-5 rounded-full blur-[10px] ${*/}
                  {/*      i % 2 === 0 ? "bg-primaryVar5" : "bg-secondaryVar3"*/}
                  {/*    }`}*/}
                  {/*  />*/}
                  {/*  /!*<div className="text-sm">Learn More</div>*!/*/}
                  {/*  /!*<img src={arrowRight} alt="" />*!/*/}
                  {/*</button>*/}
                </div>
              </div>
              <p className="whitespace-pre-wrap text-wrap text-justify">
                {trainer.about}
              </p>
            </div>
          ))}
        </div>
        {/*<button className="mx-auto flex items-center gap-1 rounded-xl border border-secondary px-5 py-2.5 text-sm font-light text-secondary">*/}
        {/*  <p>View All</p>*/}
        {/*  <img src={chevronRight} alt="" />*/}
        {/*</button>*/}
      </motion.div>
    </section>
  );
};

export default Trainers;
