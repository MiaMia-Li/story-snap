// stores/sidebarStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggleExpanded: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      expanded: false,
      setExpanded: (value) => set({ expanded: value }),
      toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
    }),
    {
      name: "sidebar-storage", // localStorage 的 key
    }
  )
);
