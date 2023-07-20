import { produce } from 'immer';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { HiOutlineFolderPlus } from 'react-icons/hi2';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { TiDocumentDelete } from 'react-icons/ti';
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import { Child, childFamily, selectedAtom, selectedFolder } from './atoms';

function Toolbar() {
  const [state, setOpenFolder] = useRecoilState(selectedFolder);
  const setSelected = useSetRecoilState(selectedAtom);
  // setSelected folder or file when create to do tomorrow 7/14/2023
  const callback = useRecoilCallback(
    ({ set }) =>
      (item: Child, { id, type }: { id: string; type: 'file' | 'folder' }) => {
        set(childFamily(item.id), item);

        set(childFamily(id), {
          parent: item.id,
          name: `rename ${type}`,
          id,
          children: [],
          type,
        });

        if (item.type === 'folder') {
          setSelected({ file: null, folder: id });
        } else {
          setSelected((prevSelected) => ({
            file: id,
            folder: prevSelected?.folder,
          }));
        }
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
            parent: selectedF.id,
            id,
            children: null,
          },
        ];
      } else {
        draft.children = [
          ...children,
          {
            parent: selectedF.id,
            id,
            children: null,
          },
        ];
      }
    });

    // console.log({ newFileFolder });
    setOpenFolder();
    callback(newFileFolder, { id, type });
  };
  return (
    <div className="  flex items-center pl-5 pb-2 border border-yellow-500">
      <div
        title={`rename  `}
        className=" cursor-pointer   flex items-center justify-center hover:opacity-50 p-2"
      >
        <MdDriveFileRenameOutline />
      </div>
      <div
        title="delete"
        className=" cursor-pointer   flex items-center justify-center hover:opacity-50 p-2"
      >
        <TiDocumentDelete />
      </div>
      <div
        title=" add file"
        className=" cursor-pointer    flex items-center justify-center hover:opacity-50 p-2"
        onClick={() => createFolder('file')}
      >
        <BsFileEarmarkPlus size="13" />
      </div>
      <div
        title=" add folder"
        className=" cursor-pointer     flex items-center justify-center hover:opacity-50 p-2"
        onClick={() => createFolder('folder')}
      >
        <HiOutlineFolderPlus />
      </div>
    </div>
  );
}

export default Toolbar;
