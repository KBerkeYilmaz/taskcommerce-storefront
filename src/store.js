// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useItemStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    }),
    {
      name: "item-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
    }
  )
);


export const useCartStore = create((set) => ({
  cartToggled: false,
  toggleCart: () => set((state) => ({ cartToggled: !state.cartToggled })),
}))
