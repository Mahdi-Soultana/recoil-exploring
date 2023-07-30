import { atom, atomFamily, selector } from 'recoil';
import { v4 } from 'uuid';
export type treeItem = {
  id: string;
  parent: string;
  children: treeItem[] | null;
};

export type Item = {
  id: string;
  parent: string;
  name: string;
  type: 'folder' | 'file';
};

export const treeState = atom<treeItem[]>({
  key: 'treeAtom',
  default: [
    {
      id: v4(),
      parent: 'root',
      children: null,
    },
  ],
});
export const itemStateFamily = atomFamily<Item, string>({
  key: 'itemStateFamily ',
  default: {
    id: v4(),
    name: 'root',
    type: 'folder',
    parent: 'root',
  },
});
export const selectedAtom = atom({ key: 'selectedAtom', default: '' });
export const isOpenAtom = atomFamily({ key: 'isOpenAtom', default: false });

export const selectedItem = selector<Item | void>({
  key: 'selectedItemSelector',
  get: ({ get }) => {
    const selectedId = get(selectedAtom);
    console.log({ selectedId });
    if (!selectedId) return;
    const item = get(itemStateFamily(selectedId));
    if (!item) return;

    return item;
  },
});
