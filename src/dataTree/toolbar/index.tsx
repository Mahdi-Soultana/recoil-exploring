import { produce } from 'immer';
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import {
  Item,
  ItemType,
  isCreateAtom,
  isOpenAtom,
  itemStateFamily,
  selectedAtom,
} from '../atoms';

function Toolbar() {
  const [isCreate, setCreate] = useRecoilState(isCreateAtom);

  const [id, setSelected] = useRecoilState(selectedAtom);
  const setOpen = useSetRecoilState(isOpenAtom(id));
  const [item, setItem] = useRecoilState(itemStateFamily(id || 'root'));

  const newItemId = v4();
  const produceNewItem = ({ type, item }: { type: ItemType; item: Item }) =>
    produce(item, (draft) => {
      const newItem = {
        parent: item.id,
        type,
        children: null,
        id: newItemId,
      };
      if (draft.children == null) {
        draft.children = [newItem];
      } else {
        draft.children = [...draft.children, newItem];
      }
    });

  const callback = useRecoilCallback(({ set }) => (type: 'file' | 'folder') => {
    if (!item) return;
    if (isCreate) return;
    if (item.type === 'file') return;

    setCreate(true);
    const newItem = produceNewItem({ type, item });

    setItem(newItem);
    setSelected(newItemId);
    setOpen(true);
  });

  const handleClick = (type: 'file' | 'folder') => {
    callback(type);
    console.log({ item });
  };

  return (
    <div className="w-[400px] space-x-4 mb-4">
      <button
        className="bg-gray-800 rounded p-1 "
        onClick={() => {
          handleClick('folder');
        }}
      >
        Add folder
      </button>
      <button
        className="bg-gray-800 rounded p-1 "
        onClick={() => {
          handleClick('file');
        }}
      >
        Add file
      </button>
    </div>
  );
}

export default Toolbar;
