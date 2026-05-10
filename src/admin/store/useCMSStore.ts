import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  updatedAt: string;
}

interface CMSState {
  pages: Page[];
  isLoading: boolean;
  setPages: (pages: Page[]) => void;
  setLoading: (isLoading: boolean) => void;
  activePageId: string | null;
  setActivePageId: (id: string | null) => void;
}

export const useCMSStore = create<CMSState>()(
  persist(
    (set) => ({
      pages: [],
      isLoading: false,
      setPages: (pages) => set({ pages }),
      setLoading: (isLoading) => set({ isLoading }),
      activePageId: null,
      setActivePageId: (id) => set({ activePageId: id }),
    }),
    {
      name: 'cms-storage',
    }
  )
);
