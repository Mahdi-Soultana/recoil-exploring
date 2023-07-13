import { atom, atomFamily } from 'recoil';
export type item = { id: string; children: item[] | null };
export type Child = {
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
    type: 'folder',
    name: 'loading...',
    id: 'initial_Id',
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

export const treeAtoms = atom<Tree>({
  key: 'treeAtoms',
  default: [],
});
