import { useRecoilState } from 'recoil';
import { selectedItem } from '../atoms';

function Toolbar() {
  const [item, setItem] = useRecoilState(selectedItem);

  // const [id, setSelected] = useRecoilState(selectedAtom);
  // const setOpen = useSetRecoilState(isOpenAtom(id));
  // const [item, setItem] = useRecoilState(itemStateFamily(id || 'root'));

  // const newItemId = v4();
  // const produceNewItem = ({ type, item }: { type: ItemType; item: Item }) =>
  //   produce(item, (draft) => {
  //     const newItem = {
  //       parent: item.id,
  //       type,
  //       children: null,
  //       id: newItemId,
  //     };

  //     draft.children = produce(draft.children, (childrenD) => {
  //       if (childrenD == null) {
  //         return [newItem];
  //       } else {
  //         return [...childrenD, newItem];
  //       }
  //     });
  //   });

  // const callback = useRecoilCallback(({ set }) => (type: 'file' | 'folder') => {
  //   if (!item) return;
  //   if (isCreate) return;
  //   if (item.type === 'file') return;

  //   setCreate(true);
  //   const newItem = produceNewItem({ type, item });

  //   setItem(newItem);
  //   setSelected(newItemId);
  //   setOpen(true);
  // });

  const handleClick = (type: 'file' | 'folder') => {
    setItem(type);
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
