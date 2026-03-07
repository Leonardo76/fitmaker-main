import { services } from "../lib/constants";

import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Services = () => {
  return (
    <section
      className={`relative py-8 md:mx-1 lg:py-10 xl:py-12`}
      id="services"
    >
      <div className="absolute inset-0 h-1/4 w-full bg-primaryVar4 blur-[400px]" />
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container space-y-4 text-center xl:space-y-6"
      >
        <h2 className="titlu-capitol-text">
          Stabilește-ți <span className="text-primary">Obiectivele</span>
        </h2>
        <div className="grid gap-3 px-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.name} className="relative overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col p-4 pt-[75%] md:pt-[80%] lg:pt-[70%]">
                <div className="mb-3 flex min-h-[3.5rem] items-center justify-center">
                  <p className="text-xl lg:text-2xl font-bold uppercase text-red-500 drop-shadow-lg">
                    {service.name}
                  </p>
                </div>

                <p className="continut-text text-justify leading-relaxed text-gray-200 drop-shadow-md">
                  {service.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
