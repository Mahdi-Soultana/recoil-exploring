import { useRecoilState } from 'recoil';
import { childOpen } from './atoms';
function FileFolder({
  name,

  type,
  id,
  onOpen,
}: {
  name: string;

  type: 'file' | 'folder';
  id: string;
  onOpen: () => void;
}) {
  const [open, setOpen] = useRecoilState(childOpen(id));
  return (
    <div
      className="flex items-center space-x-2 text-xs font-Lato cursor-pointer group"
      onClick={() => {
        onOpen();
        if (type == 'folder') {
          setOpen((s) => !s);
        }
      }}
    >
      <span
        className={`w-5 h-5 ${
          open && type !== 'file' ? 'bg-yellow-400' : 'bg-gray-400'
        }`}
      ></span>
      <p className="group-hover:text-yellow-700">{name}</p>
    </div>
  );
}

export default FileFolder;
