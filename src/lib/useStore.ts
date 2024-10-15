import { create } from 'zustand';

interface StoreState {
    count: number;
    increaseCount: () => void;
    decreaseCount: () => void;
    resetCount: () => void;
}

const useStore = create<StoreState>((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),
    resetCount: () => set({ count: 0 }),
}));

export default useStore;
