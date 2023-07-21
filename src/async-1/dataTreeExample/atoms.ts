import { atom, atomFamily, selector } from 'recoil';
export type item = { parent: string; id: string; children: item[] | null };
export type Child = {
  parent: string;
  id: string;
  name: string;
  type: 'folder' | 'file';
} & item;

export type Tree = Child[];

export const selectedAtom = atom<{
  folder?: string | null;
  file: string | null;
} | null>({
  key: 'selectedAtom',
  default: null,
});
export const childFamily = atomFamily<Child | null, string>({
  key: 'childAtom',
  default: {
    parent: '',
    type: 'folder',
    name: 'loading...',
    id: 'root',
    children: null,
  },
  effects: [
    (props) => {
      // console.log({ props });
      // props.onSet((newV, oldV) => {
      //   console.log({ newV });
      // });
    },
  ],
});
//
export const childOpen = atomFamily({
  key: 'childOpenAtomFamily',
  default: false,
});

export const selectedFolder = selector<{
  folder: Child;
  isOpen: boolean;
} | void>({
  key: 'selector-child',
  get({ get }) {
    const selected = get(selectedAtom);
    if (!selected?.folder) return;
    const folderId = selected.folder;
    const isOpen = get(childOpen(folderId));
    const folder = get(childFamily(folderId));
    if (!folder) return;
    return { folder, isOpen };
  },
  set({ get, set }) {
    const selected = get(selectedAtom);
    if (!selected?.folder) return;
    const folderId = selected.folder;
    const isOpen = get(childOpen(folderId));

    set(childOpen(folderId), true);
  },
});
export const treeAtoms = atom<Tree>({
  key: 'treeAtoms',
  default: [],
});

export const allowedCreate = atom({
  key: 'allowed-create-atom',
  default: true,
});
