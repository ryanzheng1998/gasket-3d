import { create } from "zustand";

const initState = {
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
};

export const useStore = create<typeof initState>()(() => ({ ...initState }));
