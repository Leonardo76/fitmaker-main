import { ourWebsite } from "../lib/constants";
import { Fragment } from "react";

import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const OurWebsite = () => {
  return (
    <section className={`py-8 lg:py-10 xl:py-12`}>
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container relative flex items-stretch justify-between gap-3 max-md:flex-col md:gap-2"
      >
        <div className="absolute left-1/2 top-1/2 -z-10 h-1/4 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primaryVar5 blur-[100px]" />
        {ourWebsite.map((item, index) => {
          return (
            <Fragment key={item.title || index}>
              <div className="flex flex-1 flex-col text-center text-sm font-medium">
                <div className="flex h-full flex-col">
                  <div className="mb-2 flex min-h-[4rem] items-center justify-center lg:min-h-[3.5rem]">
                    <div className="continut-text text-center break-words">
                      <span
                        className={`text-2xl font-bold ${
                          index % 2 === 0 ? "text-primary" : "text-secondary"
                        }`}
                      >
                        {item.numbers}
                      </span>{" "}
                      {item.title}
                    </div>
                  </div>

                  <p className="continut-text text-center break-words text-greyText">
                    {item.description}
                  </p>
                </div>
              </div>

              <div
                className={`${
                  index === ourWebsite.length - 1 ? "hidden" : ""
                } flex justify-center py-3 md:self-stretch md:px-1 md:py-0 xl:px-2`}
              >
                <div className="h-[3px] w-[35vw] rounded-full bg-gradient-to-r from-primary to-secondary sm:w-[30vw] md:h-full md:w-[3px] lg:bg-gradient-to-b" />
              </div>
            </Fragment>
          );
        })}
      </motion.div>
    </section>
  );
};

export default OurWebsite;
