import { create } from "zustand";

interface FeedbackModalState {
  open: boolean;
  message: string;
  show: (message: string) => void;
  close: () => void;
}

export const useFeedbackModal = create<FeedbackModalState>((set) => ({
  open: false,
  message: "",
  show: (message) => set({ message, open: true }),
  close: () => set({ open: false, message: "" }),
}));
