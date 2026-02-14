import { AnimatePresence, motion } from "motion/react";
import Community from "./components/Community";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OurWebsite from "./components/OurWebsite";
import Plans from "./components/Plans";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Trainers from "./components/Trainers";
import { MouseEvent, useEffect, useState } from "react";
import { useMenuStore } from "./stores/useMenuStore";

//TODO: la BirthDate in Vivaldi icon este apropriat de mm/dd/yyyy
//TODO: animate menu hover
//TODO: Join Our Fitness Community nu imi place ultimul paragraf (sa il fac centrat??)
//TODO: sa pun titlu la form
//TODO: padding top mai mare la send email
//TODO: callback la Start your journey si la Explore Programs

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuOpen = useMenuStore((state) => state.menuOpen);
  const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (menuOpen) {
      setMenuOpen(false);
    }
    document.getElementsByTagName("html")[0]?.scrollIntoView({
      behavior: "smooth",
    });
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
          //  hidden lg:block
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
              <a href="#" onClick={handleClick} className="text-red-700">
                Scroll to top
              </a>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
