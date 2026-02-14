import { MouseEvent, useEffect, useState } from "react";
import { chevronDown, menu } from "../assets";
import { navLinks } from "../constants";
import Logo from "./reusable/Logo";
import MobileMenu from "./MobileMenu";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import { useMenuStore } from "../stores/useMenuStore";

export const headerVar = {
  visible: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
  hidden: { y: "-100%", transition: { duration: 0.35, ease: "easeInOut" } },
};

const Header = () => {
  const menuOpen= useMenuStore(state=>state.menuOpen);
  const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    menuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 350) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();

    if (!href) {
      return;
    }

    if (href.length > 1 && href.startsWith("#")) {
      const id = href.substring(href.indexOf("#") + 1);
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };


  return (
    <motion.header
      variants={headerVar}
      animate={hidden ? "hidden" : "visible"}
      className="sticky top-0 z-50 bg-grey py-4 lg:py-5"
    >
      <div className="container flex justify-between">
        <div className="mr-6 flex items-center gap-3 max-lg:flex-1 xl:gap-6">
          <Logo />
        </div>
        <nav className="hidden flex-1 items-center justify-around lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="flex items-center gap-1 font-medium"
              onClick={(e) => handleClick(e, link.href)}
            >
              <div className="flex flex-col items-center gap-1">
                {!link.title.toLowerCase().includes("join") && (
                  <div className="flex cursor-pointer flex-col items-center transition-transform duration-500 hover:after:block hover:after:h-1 hover:after:w-[200%] hover:after:rounded-full hover:after:bg-primary">
                    {link.title}
                  </div>
                )}
                {link.title.toLowerCase().includes("join") && (
                  <div className="flex cursor-pointer flex-col items-center rounded-md bg-primary p-2 transition-transform duration-500 hover:scale-125">
                    {link.title}
                  </div>
                )}
              </div>
              {link.hasChildren && (
                <img src={chevronDown} alt="-" width={12} height={12} />
              )}
            </a>
          ))}
        </nav>
        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <img src={menu} alt="menu" width={36} height={36} />
        </button>
      </div>
      <AnimatePresence>{menuOpen && <MobileMenu />}</AnimatePresence>
    </motion.header>
  );
};

export default Header;
