import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";
import { generateRandomString8Char } from "./helper";

interface Links {
  url: string;
  parsedUrl: string;
}

interface ILinkStore {
  links: Links[];
  addLink: (url: string) => void;
}

const useLinkStore = create<ILinkStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        links: [],
        addLink: (url: string) => {
          const { links } = get();

          set({
            links: [
              ...links,
              {
                url: url,
                parsedUrl: `${generateRandomString8Char()}`,
              },
            ],
          });
        },
      }),
      {
        name: "link-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state: ILinkStore) => {
          const { links } = state;
          return { links };
        },
      }
    )
  )
);

export default useLinkStore;
