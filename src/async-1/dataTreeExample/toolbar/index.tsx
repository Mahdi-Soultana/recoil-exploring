import { produce } from 'immer';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { TiFolderAdd, TiFolderDelete } from 'react-icons/ti';
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import { Child, childFamily, selectedAtom, selectedFolder } from '../atoms';
// import { Child, childFamily, selectedAtom, selectedFolder } from './atoms';

function Toolbar() {
  const [state, setState] = useRecoilState(selectedFolder);
  const setSelect = useSetRecoilState(selectedAtom);
  // setSelected folder or file when create to do tomorrow 7/14/2023
  const callback = useRecoilCallback(
    ({ set }) =>
      (item: Child, { id, type }: { id: string; type: 'file' | 'folder' }) => {
        set(childFamily(item.id), item);

        set(childFamily(id), {
          name: `rename ${type}`,
          id,
          children: [],
          type,
        });
      },
  );
  if (!state) return null;

  const { folder: selectedF, isOpen } = state;
  const createFolder = (type: 'file' | 'folder') => {
    if (selectedF.name == 'loading...') return;
    const id = v4();
    const newFileFolder = produce(selectedF, (draft) => {
      let children = draft.children;
      if (children == null) {
        draft.children = [
          {
            id,
            children: null,
          },
        ];
      } else {
        draft.children = [
          ...children,
          {
            id,
            children: null,
          },
        ];
      }
    });

    // console.log({ newFileFolder });
    callback(newFileFolder, { id, type });
    setState();
  };
  return (
    <div className="flex items-center pl-5 pb-2">
      <div className="  flex items-center justify-center hover:opacity-50 p-2">
        <MdDriveFileRenameOutline />
      </div>
      <div className="  flex items-center justify-center hover:opacity-50 p-2">
        <TiFolderDelete />
      </div>
      <div
        className="   flex items-center justify-center hover:opacity-50 p-2"
        onClick={() => createFolder('file')}
      >
        <BsFileEarmarkPlus size="13" />
      </div>
      <div
        className="    flex items-center justify-center hover:opacity-50 p-2"
        onClick={() => createFolder('folder')}
      >
        <TiFolderAdd />
      </div>
    </div>
  );
}

export default Toolbar;
