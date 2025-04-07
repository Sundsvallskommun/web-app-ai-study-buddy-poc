import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { AssistantSettings, ModelId } from "../types";

interface AppStore {
  sessionId: string;
  setSessionId: (id: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  files?: ModelId[];
  addFile: (file: ModelId) => void;
  resetFiles: () => void;
  assistants: Record<string, AssistantSettings>;
  setAssistants: (assistants: Record<string, AssistantSettings>) => void;
}

export const useAppStore = createWithEqualityFn(
  persist<AppStore>(
    (set) => ({
      sessionId: "",
      setSessionId: (sessionId) => set(() => ({ sessionId })),
      selectedLanguage: "",
      setSelectedLanguage: (selectedLanguage) =>
        set(() => ({ selectedLanguage })),
      files: [],
      addFile: (file) => set((state) => ({ files: [...state.files, file] })),
      resetFiles: () => set(() => ({ files: [] })),
      assistants: {},
      setAssistants: (assistants) => set(() => ({ assistants })),
    }),
    {
      name: import.meta.env.VITE_APPLICATION,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
