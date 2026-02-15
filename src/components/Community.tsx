import { revealVar } from "../motion/opacityReveal";

import { motion } from "motion/react";
import { EmailForm } from "./EmailForm";

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
        <div className="relative flex flex-col justify-between gap-3 mx-1 md:mx-3 xl:gap-4">
          <div className="absolute left-1/2 top-1/2 -z-10 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primaryVar5 blur-[150px]" />
          <h2 className="text-center w-full text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl">
            Join Our <span className="text-primary">Fitness Community</span>
          </h2>
          <p className="max-xl:text-xs">
            Enroll now to unlock exclusive access to personalized workout plans,
            expert coaching, and a supportive community that will help you
            achieve your fitness goals.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
            <div className="h-30 rounded-lg bg-grey p-1.5 md:p-2 xl:p-3 text-center ">
              <h4 className="mb-1 text-center font-medium max-xl:text-sm xl:mb-2">
                Expert <span className="text-primary">Coaching</span>
              </h4>
              <p className="text-xs">
                Customized routines that match your fitness level and goals,
                ensuring you achieve the best results in the most efficient way.
              </p>
            </div>
            <div className="h-30 rounded-lg bg-grey p-1.5 md:p-2 xl:p-3 text-center ">
              <h4 className="mb-1 text-center font-medium max-xl:text-sm xl:mb-2">
                <span className="text-primary">Personalized</span> Workout Plans
              </h4>
              <p className="text-xs">
                Work with certified trainers who will guide you every step of
                the way to ensure you&apos;re on the right track. Sign Up.
              </p>
            </div>
            <div className="h-30 rounded-lg bg-grey p-1.5 md:p-2 xl:p-3 text-center ">
              <h4 className="mb-1 text-center font-medium max-xl:text-sm xl:mb-2">
                <span className="text-primary">Community </span> Support
              </h4>
              <p className="text-xs">
                Join a vibrant community of fitness enthusiasts where you can
                share experiences, get motivated, and stay inspired.
              </p>
            </div>
            {/*<div className="rounded-lg bg-gray p-1.5 md:p-2 xl:p-3">*/}
            {/*  <h4 className="mb-1 text-center font-medium max-xl:text-sm xl:mb-2">*/}
            {/*    Exclusive <span className="text-primary">Resources</span>*/}
            {/*  </h4>*/}
            {/*  <p className="text-xs">*/}
            {/*    Access premium content, including video tutorials, nutrition*/}
            {/*    guides, and member-only discounts on fitness gear.*/}
            {/*  </p>*/}
            {/*</div>*/}
          </div>
        </div>

        <EmailForm />
      </motion.div>
    </section>
  );
};

export default Community;
