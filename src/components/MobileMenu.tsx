import { close } from "../assets";
import { navLinks } from "../lib/constants";
import { menuVar } from "../motion/header";
import Logo from "./reusable/Logo";

import { motion } from "motion/react";
import { MouseEvent } from "react";
import { useMenuStore } from "../stores/useMenuStore";

const MobileMenu = () => {
  const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);

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
    <motion.div
      variants={menuVar}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed left-0 right-0 top-0 z-20 flex h-screen w-screen flex-col bg-grey p-4"
    >
      <div className="flex items-center justify-between">
        <Logo />
        <button onClick={() => setMenuOpen(false)}>
          <img src={close} alt="close" width={36} height={36} />
        </button>
      </div>
      <nav className="relative flex flex-1 flex-col items-center justify-center gap-8">
        <div className="absolute -z-10 h-1/4 w-1/2 rounded-full bg-primaryVar5 blur-[100px]" />
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="font-semibold"
            onClick={(e) => handleClick(e, link.href)}
          >
            {!link.title.toLowerCase().includes("join") && (
              // <div className="flex cursor-pointer flex-col items-center transition-transform duration-500 hover:after:block hover:after:h-1 hover:after:w-[200%] hover:after:rounded-full hover:after:bg-primary">
              <div className="flex cursor-pointer flex-col items-center after:content-[''] after:block after:h-1 after:w-0 hover:after:w-[200%] after:rounded-full after:bg-primary after:transition-all  after:duration-300  after:ease-in-out">
                {link.title}
              </div>
            )}
            {link.title.toLowerCase().includes("join") && (
              <div className="flex cursor-pointer flex-col items-center rounded-md bg-primary p-2 transition-transform duration-500 hover:scale-125">
                {link.title}
              </div>
            )}
          </a>
        ))}
      </nav>
    </motion.div>
  );
};

export default MobileMenu;
