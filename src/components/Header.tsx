import { MouseEvent, useEffect, useState } from "react";
import { chevronDown, menu } from "../assets";
import { navLinksConfig } from "../lib/constants";
import Logo from "./reusable/Logo";
import MobileMenu from "./MobileMenu";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import { useMenuStore } from "../stores/useMenuStore";
import { headerVar } from "../motion/header";
import { buildNavLinks } from "../lib/utils";

const Header = () => {
  const menuOpen = useMenuStore((state) => state.menuOpen);
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
    // Dacă previous e undefined, îl tratăm ca "latest" (adică nu ascundem header-ul din primul event).
    const previous = scrollY.getPrevious() ?? latest;

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

  const navLinks = buildNavLinks(navLinksConfig);

  // const navLinks = navLinksConfig.map((item, index) => ({
  //   // id: generat automat => utilizatorul nu-l mai editează manual
  //   id: index + 1,
  //
  //   // title: vine direct din config-ul simplu
  //   title: item.title,
  //
  //   // href: generat automat in sectionId
  //   href: `#${item.sectionId}`,
  //
  //   // hasChildren: rămâne false (cum era la tine) fără să fie repetat în config
  //   hasChildren: false,
  //
  //   // variant: derivat din isCta; nu depinde de text și nu are "as const" în config
  //   variant: "isCta" in item && item.isCta ? ("cta" as const) : undefined,
  // }));

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
              {/*<div className="flex flex-col items-center gap-1">*/}
              <div className="flex flex-col items-center gap-1 ">
                {link.variant !== "cta" && (
                  <div className="flex cursor-pointer flex-col items-center after:content-[''] after:block after:h-1 after:w-0 hover:after:w-[200%] after:rounded-full after:bg-primary after:transition-all  after:duration-300  after:ease-in-out">
                    {link.title}
                  </div>
                )}

                {link.variant === "cta" && (
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
