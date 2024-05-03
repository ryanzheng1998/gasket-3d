import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const initState = {
  rotationX: 0,
  rotationY: 0,
  divisionCount: 5,
};

export const useStore = create<typeof initState>()(
  subscribeWithSelector(() => ({ ...initState })),
);
