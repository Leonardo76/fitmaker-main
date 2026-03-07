import { revealVar } from "../motion/opacityReveal";

import { motion } from "motion/react";

const Community = () => {
  return (
    <section className={`py-8 lg:py-10 xl:py-12`}>
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container flex flex-col gap-4 xl:gap-6"
      >
        <div className="relative mx-1 flex flex-col justify-between gap-3 md:mx-3 xl:gap-4">
          <div className="absolute left-1/2 top-1/2 -z-10 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primaryVar5 blur-[150px]" />
          <h2 className="titlu-capitol-text w-full text-center">
            Alătura-te <span className="text-primary">Comunității</span> Mele
          </h2>
          <p className="continut-text text-justify">
            Înscrie-te acum pentru a obține acces exclusiv la planuri de
            antrenament personalizate, îndrumare de specialitate și o comunitate
            de susținere care te va ajuta să îți atingi obiectivele de fitness.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch md:gap-6">
            <div className="rounded-lg bg-greyLight p-1.5 text-left md:flex md:h-full md:flex-col md:p-2 xl:p-3">
              <div className="mb-1 md:flex md:min-h-[3.5rem] md:items-center md:justify-center xl:mb-2">
                <h4 className="subtitlu-capitol-text text-center font-medium">
                  Îndrumare{" "}
                  <span className="text-primary">de specialitate</span>
                </h4>
              </div>
              <p className="continut-text text-justify">
                Rutine personalizate care se potrivesc nivelului tău de fitness
                și obiectivelor tale, astfel încât să obții cele mai bune
                rezultate în cel mai eficient mod.
              </p>
            </div>
            <div className="rounded-lg bg-greyLight p-1.5 text-left md:flex md:h-full md:flex-col md:p-2 xl:p-3">
              <div className="mb-1 md:flex md:min-h-[3.5rem] md:items-center md:justify-center xl:mb-2">
                <h4 className="subtitlu-capitol-text text-center font-medium">
                  Planuri de antrenament{" "}
                  <span className="text-primary">personalizate</span>
                </h4>
              </div>
              <p className="continut-text text-justify">
                Lucrează alături de un antrenor certificat care te va ghida la
                fiecare pas, pentru ca tu să fii mereu pe drumul cel bun.
                Înscrie-te acum.
              </p>
            </div>
            <div className="rounded-lg bg-greyLight p-1.5 text-left md:flex md:h-full md:flex-col md:p-2 xl:p-3">
              <div className="mb-1 md:flex md:min-h-[3.5rem] md:items-center md:justify-center xl:mb-2">
                <h4 className="subtitlu-capitol-text text-center font-medium">
                  <span className="text-primary">Sprijinul</span> comunității
                </h4>
              </div>
              <p className="continut-text text-justify">
                Alătură-te unei comunități active de pasionați de fitness, unde
                poți împărtăși experiențe, găsi motivație și rămâne inspirat.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Community;
