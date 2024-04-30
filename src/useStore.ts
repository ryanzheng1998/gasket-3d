import { create } from "zustand";

const initState = {};

export const useStore = create<typeof initState>()(() => ({ ...initState }));
