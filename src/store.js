// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useItemStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const newItem = {
            ...item,
            cartID: Math.random().toString(36).substring(2, 15),
          };
          return { items: [...state.items, newItem] };
        }),
      removeItem: (cartID) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartID !== cartID),
        })),
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
}));

