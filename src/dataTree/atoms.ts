import { produce } from 'immer';
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
    id: 'default',
    name: 'default',
    type: 'folder',
    parent: 'default',
    children: null,
  },
  effects: [
    ({ onSet, getPromise, ...rest }) => {
      onSet((newValue, OldValue) => {
        if (newValue.id !== 'default' && !Array.isArray(newValue.children)) {
          // itemHistory.push(newValue);

          const buildTree = (tree: any): any => {
            if (newValue.parent == 'root') {
              tree.push(newValue);
              return;
            } else if (newValue.parent == 'first') {
              if (tree[0].children == null) {
                tree[0] = { ...tree[0], children: [newValue] };
              } else {
                tree[0].children.push(newValue);
              }
              return;
            } else {
              // const iterateTree = tree[0].children;
              console.log(newValue);
              console.log('here');
              // iterateTree.forEach((item: any) => {
              //   if (newValue.parent == item.parent) {
              //     if (item.children == null) {
              //       item = { ...item, children: [newValue] };
              //     } else {
              //       item.children.push(newValue);
              //     }
              //     return;
              //   }
              //   if (Array.isArray(item.children)) {
              //     buildTree(item.children);
              //   }
              // });
            }
          };
          buildTree(newTree);

          console.log(newTree);
        }
      });
    },
  ],
});
let newTree: any = [];
const itemHistory: Item[] = [];
export const selectedAtom = atom<string | null>({
  key: 'selectedAtom ' + v4(),
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
  set: ({ set, get }, type) => {
    const newItemId = v4();

    const produceNewItem = ({ type, item }: { type: ItemType; item: Item }) =>
      produce(item, (draft) => {
        const newItem = {
          parent: item.id,
          type,
          children: null,
          id: newItemId,
        };
        // set(treeState, (tree) => {
        //   const newTree: Item[] = JSON.parse(JSON.stringify(tree));
        //   const buildTree = (tree: Item[] | treeItem[]) => {
        //     tree.forEach((element) => {
        //       if (element.id == item.id) {
        //         if (Array.isArray(element.children)) {
        //           element.children.push(newItem);
        //         } else {
        //           element.children = [newItem];
        //         }
        //         return;
        //       }
        //       if (Array.isArray(element.children)) {
        //         buildTree(element.children);
        //       }
        //     });
        //   };
        //   buildTree(newTree);
        //   console.log(newTree);
        //   return newTree;
        // });
        draft.children = produce(draft.children, (childrenD) => {
          if (childrenD == null) {
            return [newItem];
          } else {
            return [...childrenD, newItem];
          }
        });
        return draft;
      });

    const selectedId = get(selectedAtom);
    const isCreate = get(isCreateAtom);

    if (!selectedId) return;
    const item = get(itemStateFamily(selectedId));
    if (isCreate) return;
    if (item.type === 'file') return;
    const newItem = produceNewItem({ type, item });

    set(isCreateAtom, true);
    if (type == 'folder') {
      set(selectedAtom, newItemId);
    }

    set(isOpenAtom(selectedId), true);
    set(itemStateFamily(selectedId), newItem);
  },
});
