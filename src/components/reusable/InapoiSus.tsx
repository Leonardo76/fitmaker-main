import { type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMenuStore } from "../../stores/useMenuStore";

type InapoiSusProps = {
  scrollPosition: number;
  menuOpen: boolean;
};

export default function InapoiSus({
  scrollPosition,
  menuOpen,
}: InapoiSusProps) {
  const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

  const handleScrollToTopClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (menuOpen) setMenuOpen(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {scrollPosition > 100 && (
        <motion.div
          className="fixed left-0.5 top-1/2 text-xs font-medium"
          id="float"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 1 }}
        >
          <span className="rotate-180 tracking-tight [writing-mode:vertical-lr]">
            <button
              type="button"
              onClick={handleScrollToTopClick}
              className="text-red-400"
              aria-label="Mergi sus în pagină"
            >
              Înapoi sus
            </button>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
