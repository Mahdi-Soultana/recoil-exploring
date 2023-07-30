import { produce } from 'immer';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { HiOutlineFolderPlus } from 'react-icons/hi2';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { TiDocumentDelete } from 'react-icons/ti';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { v4 } from 'uuid';
import {
  Child,
  allowedCreate,
  childFamily,
  selectedAtom,
  selectedFolder,
} from '../atoms';

function Toolbar() {
  const [state, setOpenFolder] = useRecoilState(selectedFolder);
  const setSelected = useSetRecoilState(selectedAtom);
  const [allowedCreateBool, setAllowedCreate] = useRecoilState(allowedCreate);
  // setSelected folder or file when create to do tomorrow 7/14/2023
  const callback = useRecoilCallback(
    ({ set }) =>
      (item: Child, { id, type }: { id: string; type: 'file' | 'folder' }) => {
        if (allowedCreateBool) {
          set(childFamily(item.id), item);

          set(childFamily(id), {
            parent: item.id,
            name: `rename ${type}`,
            id,
            children: [],
            type,
          });
          setAllowedCreate(false);
          if (item.type === 'folder') {
            setSelected({ file: null, folder: id });
          } else {
            setSelected((prevSelected) => ({
              file: id,
              folder: prevSelected?.folder,
            }));
          }
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
            name: `rename ${type}`,
          },
        ];
      } else {
        draft.children = [
          ...children,
          {
            parent: selectedF.id,
            id,
            children: null,
            name: `rename ${type}`,
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
      <DeleteIcon />
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
const DeleteIcon = () => {
  const [selectedState, setSelected] = useRecoilState(selectedAtom);
  let selected: string = '';
  if (selectedState?.file) {
    selected = selectedState?.file;
  } else {
    if (selectedState?.folder) {
      selected = selectedState?.folder;
    }
  }

  const value = useRecoilValue(childFamily(selected));
  if (!value) return null;
  const parentValue = useRecoilValue(childFamily(value?.parent));
  console.log({ parentValue });
  return (
    <div
      title="delete"
      className=" cursor-pointer   flex items-center justify-center hover:opacity-50 p-2"
    >
      <TiDocumentDelete />
    </div>
  );
};

export default Toolbar;
