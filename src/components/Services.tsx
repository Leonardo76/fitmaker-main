import { services } from "../lib/constants";

import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Services = () => {
  return (
    <section
      className={`md:mx-1 py-8 relative lg:py-10 xl:py-12`}
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
        <h2 className="text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl">
          Our <span className="text-primary">Services</span>
        </h2>
        {/* VECHI */}
        {/* <p className="text-xs lg:text-sm xl:text-base">
         At This Part You Can Easily access all of our services. take a look at
         them and chose whichever you want.
         </p> */}

        {/* NOU (copy mai curat) */}
        <p className="text-xs lg:text-sm xl:text-base">
          Explore our services below and choose the option that fits your goals.
        </p>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 px-1">
          {/* VECHI */}
          {/* {services.map((service, i) => (
           <div key={i} className="relative overflow-hidden">
           <img
           src={service.image}
           alt=""
           className="w-full h-full object-cover"
           /> */}

          {/* NOU */}
          {services.map((service) => (
            <div key={service.id} className="relative overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col top-1/2 lg:-translate-y-[10%] gap-3 p-4">
                <p className="text-2xl font-bold uppercase text-red-500 drop-shadow-lg">
                  {service.name}
                </p>

                <p className="text-sm md:text-base text-gray-200 leading-relaxed drop-shadow-md ">
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
