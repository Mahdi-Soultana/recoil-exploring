import { atom, atomFamily, selector } from 'recoil';
import { v4 } from 'uuid';
export type ItemType = 'file' | 'folder' | 'default';
export interface treeItem {
  id: string;
  parent: string;
  type: ItemType;
  children: treeItem[] | null;
}

export type Item = {
  id: string;
  parent: string;
  type: ItemType;
  children: treeItem[] | null;
  name: string;
};

export const treeState = atom<treeItem[]>({
  key: 'treeAtom',
  default: [],
});
export const itemStateFamily = atomFamily<Item, string>({
  key: 'itemStateFamily ',
  default: {
    id: v4(),
    name: 'default',
    type: 'folder',
    parent: 'default',
    children: null,
  },
});
export const selectedAtom = atom<string | null>({
  key: 'selectedAtom',
  default: '',
});
export const isOpenAtom = atomFamily({ key: 'isOpenAtom', default: false });
export const isCreateAtom = atom({ key: 'isCreateAtom', default: false });

export const selectedItem = selector<Item | undefined>({
  key: 'selectedItemSelector',
  get: ({ get }) => {
    const selectedId = get(selectedAtom);

    if (!selectedId) return;
    const item = get(itemStateFamily(selectedId));

    return item;
  },
});
