import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { v4 } from 'uuid';
import { itemStateFamily, selectedAtom, treeState } from '../atoms';

function Toolbar() {
  const id = useRecoilValue(selectedAtom);

  const [item, setItem] = useRecoilState(itemStateFamily(id));
  const callback = useRecoilCallback(({ set }) => (type: 'file' | 'folder') => {
    console.log(id);
    if (!id) {
      set(treeState, (s) => [
        ...s,
        { id: v4(), parent: 'root', children: null },
      ]);
    }
  });

  const handleClick = (type: 'file' | 'folder') => {
    callback(type);
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
