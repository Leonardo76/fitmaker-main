import { AnimatePresence, motion } from "motion/react";
// import { MouseEvent, useEffect, useState } from "react"; // VECHI (MouseEvent pt <a>)
import { MouseEvent, useEffect, useState } from "react"; // NOU: MouseEvent rămâne, dar pt <button>
import { useMenuStore } from "./stores/useMenuStore";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OurWebsite from "./components/OurWebsite";
import Services from "./components/Services";
import Plans from "./components/Plans";
import Testimonials from "./components/Testimonials";
import Trainers from "./components/Trainers";
import Community from "./components/Community";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuOpen = useMenuStore((state) => state.menuOpen);
  const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

  useEffect(() => {
    let rafId: number | null = null;

    const updatePosition = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        setScrollPosition(window.scrollY || window.pageYOffset || 0);
        rafId = null;
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updatePosition);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollToTopClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (menuOpen) setMenuOpen(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-vazirmatn text-white">
      <Header />
      <Hero />
      <OurWebsite />
      <Services />
      <Plans />
      <Testimonials />
      <Trainers />
      {/* Blog poate fi folosit pentru exemplu de filme */}
      {/*<Blog />*/}
      <Community />
      <Faq />
      <Footer />

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
    </div>
  );
}

export default App;
