import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type MenuState = {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void; //React.Dispatch<React.SetStateAction<boolean>>;
};

export const useMenuStore = create<MenuState>()(
  devtools(
    immer((set) => ({
      menuOpen: false,
      setMenuOpen: (newMenuOpen: boolean) =>
        set((state) => {
          state.menuOpen = newMenuOpen;
        }),
    })),
  ),
);
