import { Variants } from "motion";

export const headerVar:Variants = {
  visible: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
  hidden: { y: "-100%", transition: { duration: 0.35, ease: "easeInOut" } },
};


export const menuVar:Variants = {
  initial: {
    x: "-100%",
  },
  animate: {
    x: "0%",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
