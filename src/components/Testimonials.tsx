import { useState } from "react";
import { arrowLeftWhite, arrowRightWhite, quote } from "../assets";
import { testimonials } from "../lib/constants";

import { AnimatePresence, motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // direcție pentru slide (next/prev)
  const [direction, setDirection] = useState<1 | -1>(1);

  const displayedTestimonial = testimonials[currentIndex];

  const nextTestimonials = [
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  // crossfade + slide (dreapta->stânga la Next, stânga->dreapta la Prev)
  // si un scale subtil (0.98 -> 1) + exit la 0.98
  const crossfadeSlide = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? 28 : -28,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? -28 : 28,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section className={`py-8 lg:py-10 xl:py-12`}>
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container space-y-4 xl:space-y-6"
      >
        <div className="items-center justify-between max-lg:flex mx-1 md:mx-3">
          <h2 className="text-center text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={handlePrev}>
              <img
                src={arrowLeftWhite}
                alt="-"
                width={22.5}
                height={28}
                className="rounded-[4px] border-2 border-white p-1 md:py-2 size-6 md:size-8"
              />
            </button>
            <button onClick={handleNext}>
              <img
                src={arrowRightWhite}
                alt="-"
                width={22.5}
                height={28}
                className="rounded-[4px] border-2 border-white p-1 md:py-2 size-6 md:size-8"
              />
            </button>
          </div>
        </div>
        <p className="text-center text-xs lg:text-sm xl:text-base mx-2">
          At This Part you can See Few Of The Many Positive reviews Of Our
          Customers.
        </p>

        <div className="flex justify-between gap-3 lg:items-end md:mx-3">
          <div className="flex items-center max-md:gap-2.5">
            {/* animație pentru imagine (la schimbare) */}
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.img
                key={displayedTestimonial.image}
                custom={direction}
                variants={crossfadeSlide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.28, ease: "easeOut" },
                  opacity: { duration: 0.18, ease: "linear" },
                  scale: { type: "tween", duration: 0.28, ease: "easeOut" },
                }}
                src={displayedTestimonial.image}
                alt={displayedTestimonial.name}
                className="w-[144px] md:w-[215px]"
              />
            </AnimatePresence>
            {/* animație pentru cardul de text (la schimbare) */}
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={displayedTestimonial.name}
                custom={direction}
                variants={crossfadeSlide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.28, ease: "easeOut" },
                  opacity: { duration: 0.18, ease: "linear" },
                  scale: { type: "tween", duration: 0.28, ease: "easeOut" },
                }}
                className={`relative self-end ${
                  currentIndex === 0 ? "md:max-xl:-ml-5" : "ml-5"
                } space-y-1 rounded-xl bg-[#5B0408] p-2 max-md:w-2/3`}
              >
                <div className="-translalate-y-1/2 absolute left-1/2 top-1/2 -z-10 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-primaryVar5 blur-[200px]" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{displayedTestimonial.name}</h3>
                    <div className="text-xs text-greyText">
                      {displayedTestimonial.about}
                    </div>
                  </div>
                  <img src={quote} alt='""' />
                </div>
                <div className="text-xs xl:text-sm">
                  {displayedTestimonial.review}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button onClick={handlePrev} className="shrink-0">
            <img
              src={arrowLeftWhite}
              alt="-"
              width={36}
              height={36}
              className="size-8 rounded-[4px] border-2 border-white px-1 py-2 max-lg:hidden xl:size-[36px]"
            />
          </button>
          <button onClick={handleNext} className="shrink-0">
            <img
              src={arrowRightWhite}
              alt="-"
              width={36}
              height={36}
              className="size-8 rounded-[4px] border-2 border-white px-1 py-2 max-lg:hidden xl:size-[36px]"
            />
          </button>
          {nextTestimonials.map((testimonial) => (
            <div
              key={`${testimonial.name}-${testimonial.about}`}
              className="relative flex shrink-0 items-end justify-center rounded-lg max-md:hidden"
            >
              <div className="absolute -z-10 h-full w-full bg-secondaryVar3 blur-[300px]" />
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-[280px] w-[102px] rounded-lg bg-secondaryVar3"
              />
              <div className="absolute mb-14 w-full -rotate-90 text-nowrap">
                {testimonial.name}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
