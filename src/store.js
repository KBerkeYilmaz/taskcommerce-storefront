// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useItemStore = create(
  persist(
    (set, get) => ({
      items: [],
      itemsCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      resetItems: () => set({ items: [] }),
      addItem: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) =>
            item.id === newItem.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(newItem.selectedAttributes)
        );

        if (existingItemIndex > -1) {
          items[existingItemIndex].quantity += 1;
        } else {
          newItem.quantity = 1;
          items.push(newItem);
        }

        set({ items: [...items] });
      },
      removeItem: (itemToRemove) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) =>
            item.id === itemToRemove.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(itemToRemove.selectedAttributes)
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          if (updatedItems[existingItemIndex].quantity > 1) {
            updatedItems[existingItemIndex].quantity -= 1;
          } else {
            updatedItems.splice(existingItemIndex, 1);
          }
          set({ items: updatedItems });
        }
      },
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
