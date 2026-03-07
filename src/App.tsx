import { useEffect, useState } from "react";
import { useMenuStore } from "./stores/useMenuStore";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OurWebsite from "./components/OurWebsite";
import Services from "./components/Services";
import Plans from "./components/Plans";
import Trainers from "./components/Trainers";
import Community from "./components/Community";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import { EmailForm } from "./components/EmailForm";
import InapoiSus from "./components/reusable/InapoiSus";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuOpen = useMenuStore((state) => state.menuOpen);

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

  return (
    <div className="font-vazirmatn text-white">
      <Header />
      <Hero />
      <OurWebsite />
      <Services />
      <Plans />
      <Trainers />
      <Community />
      <EmailForm minYear={1926} maxYear={new Date().getFullYear()} />
      <Faq />
      <Footer />

      <InapoiSus scrollPosition={scrollPosition} menuOpen={menuOpen} />
    </div>
  );
}

export default App;
