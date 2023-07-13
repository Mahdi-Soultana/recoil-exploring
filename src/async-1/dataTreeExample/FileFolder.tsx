import React from 'react';
function FileFolder({
  name,
  setOpen,
  open,
  type,
  id,
  onOpen,
}: {
  name: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  type: 'file' | 'folder';
  id: string;
  onOpen: (pram: { id: string; type: 'file' | 'folder' }) => void;
}) {
  return (
    <div
      className="flex items-center space-x-2 text-xs font-Lato cursor-pointer group"
      onClick={() => {
        onOpen({ id, type });
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
