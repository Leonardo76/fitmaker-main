import { useState } from "react";
import { faqClose } from "../assets";
import { faq } from "../lib/constants";

import { AnimatePresence, motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <section className={`py-8 lg:py-10 xl:py-12`} id="faq">
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container relative space-y-3 xl:space-y-6"
      >
        <div className="absolute left-5 top-1/2 -z-10 h-1/3 w-1/3 -translate-y-1/2 rounded-full bg-primaryVar5 blur-[200px]" />
        <div className="absolute right-5 top-1/2 -z-10 h-1/2 w-1/3 -translate-y-1/2 rounded-full bg-secondaryVar3 blur-[200px]" />

        <h2 className="text-center titlu-capitol-text">
          <span className="text-primary">Întrebări</span> Frecvente
        </h2>

        <div className="mx-1 flex flex-col gap-4 rounded-lg border-2 border-secondary md:mx-3 xl:gap-6">
          {faq.map((q, i) => (
            <div key={q.question}>
              <button
                type="button"
                onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                className={`-mb-px -ml-px -mr-0.5 -mt-0.5 flex gap-2 md:gap-0 w-full items-center justify-between rounded-lg border-2 px-3 py-2 text-left md:px-4 md:py-3 xl:px-6 xl:py-4 ${
                  openQuestion === i ? "border-primary" : "border-secondary"
                }`}
                aria-expanded={openQuestion === i}
              >
                <h3 className="question-text text-justify">{q.question}</h3>
                <motion.img
                  src={faqClose}
                  alt=""
                  initial={{ scale: 0.85, opacity: 0.7, rotate: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: openQuestion === i ? 180 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </button>

              <AnimatePresence initial={false}>
                {openQuestion === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="-mb-0.5 -ml-px -mr-0.5 -mt-5 rounded-b-lg border-x-2 border-b-2 border-primary px-4 pb-3 pt-8 lg:pt-10 xl:-mt-7">
                      <p className="text-greyTextVar1 continut-text text-justify">
                        {q.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Faq;
