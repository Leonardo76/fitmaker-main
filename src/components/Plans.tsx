import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";
import { plans } from "../lib/constants";

const Plans = () => {
  return (
    <section className={`py-8 mx-1 md:mx-3 lg:py-10 xl:py-12`} id="plans">
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container space-y-4 xl:space-y-6"
      >
        <div className="space-y-4 text-center xl:space-y-6">
          <h2 className="titlu-capitol-text">
            <span className="text-primary">Planurile</span> Mele
          </h2>
          <p className="eroare-text">
            Alege planul care se potrivește obiectivelor tale de fitness și
            dă-mi voie să te ghidez la fiecare pas.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-9">
          {plans.map((plan) => (
            <div
              key={plan.package}
              className={`relative flex flex-col gap-3 rounded-lg border-2 p-4 xl:gap-4 xl:p-6 border-primary max-sm:-order-1`}
            >
              <div
                className={`absolute left-1/2 top-4 -z-10 aspect-square w-2/3 -translate-x-1/2 max-lg:blur-[100px] lg:blur-[200px] bg-primaryVar4`}
              />
              <div className="space-y-2 text-center xl:space-y-3">
                {/*<p className={`text-sm lg:text-base text-primary`}>Pachet</p>*/}
                <div className="font-gagalin titlu-capitol-text whitespace-pre-wrap text-wrap">
                  {plan.package}
                </div>
              </div>

              <div className="space-y-2 xl:space-y-3">
                {/*<p className={`text-center text-sm lg:text-base text-primary`}>*/}
                {/*  Descriere*/}
                {/*</p>*/}
                <p className="continut-text text-justify">{plan.description}</p>
              </div>
              {/*<div className="flex-1 space-y-2 xl:space-y-3">*/}
              {/*  <p className={`text-center text-sm lg:text-base text-primary`}>*/}
              {/*    Include*/}
              {/*  </p>*/}
              {/*  <ul className="text-xs xl:text-sm">*/}
              {/*    {plan.features.map((feature, i) => (*/}
              {/*      <li key={i} className="list-inside list-disc">*/}
              {/*        {feature}*/}
              {/*      </li>*/}
              {/*    ))}*/}
              {/*  </ul>*/}
              {/*</div>*/}
              <div className="text-center text-lg font-bold xl:text-[28px]">
                {plan.price}
                <span className="text-lg font-medium text-greyText">
                  {plan.peLuna}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="eroare-text text-justify">
          <span className="text-primary">
            <strong>
              <u>Observație:</u>
            </strong>
          </span>
          {/*<strong>*/}
          {/*  <u>Observație</u>*/}
          {/*</strong>*/} Pe lângă prețul abonamentului, clientul va plăti
          abonamentul lunar pentru accesul în sală - Alpha Gym (Cartierul Latin,
          Prelungirea Ghencea) sau Nr.1 Fitness (Dimri Residence, Prelungirea
          Ghencea).
        </p>
      </motion.div>
    </section>
  );
};

export default Plans;
