import { create } from "zustand";

interface StyleState {
  styleIds: string[];
  setStyleIds: (styleIds: string[]) => void;
}

const useStyleStore = create<StyleState>((set) => ({
  styleIds: [],
  setStyleIds: (styleIds) => set({ styleIds }),
}));

export default useStyleStore;
