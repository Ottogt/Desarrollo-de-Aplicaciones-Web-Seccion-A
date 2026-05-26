import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


type menu = {
    active:string;
}

type MenuState = {
    menu: menu;
    setActive: (active: string) => void;
}


export const useMenuStore = create<MenuState>()(
  devtools(
    (set) => ({
      menu: { active: 'task' },
      setActive: (active) => set(() => ({menu:{ active }}), false, 'setActive'),
    }),
    { name: 'menu-store' }
  )
)