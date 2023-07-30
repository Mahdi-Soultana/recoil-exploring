import { motion } from 'framer-motion';
import {
  AiFillFolder,
  AiFillFolderOpen,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { BsFileEarmarkCode } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useRecoilState, useRecoilValue } from 'recoil';
import { childFamily, childOpen } from '../atoms';
import { useCreateChild } from '../hooks';
import { createDummyFiles } from '../utils';
function FileFolderContent({ id, parentId }: { id: string; parentId: string }) {
  const [open, setOpen] = useRecoilState(childOpen(id));
  const item = useRecoilValue(childFamily(id));
  const createChild = useCreateChild({ id, parentId });
  if (!item || !createChild) return null;

  const { type, name } = item;
  return (
    <div
      className="flex relative items-center space-x-1 text-xs font-Lato cursor-pointer group"
      onClick={() => {
        if (type == 'folder') {
          setOpen((s) => !s);
        }
        //   it's like making a request and getting the data and display it :)
        createChild(createDummyFiles(id, parentId), type);
      }}
    >
      {type === 'folder' &&
        (open ? <Arrow isOpen={false} /> : <Arrow isOpen={true} />)}
      <span
        className={`w-5 h-5 flex justify-center pl-1 items-center ${
          open && type === 'folder' ? 'text-yellow-500' : 'text-gray-400'
        }`}
      >
        {name == 'loading...' ? (
          <motion.div
            animate={{
              rotate: 360,
              transition: {
                repeatType: 'loop',
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            <AiOutlineLoading3Quarters size="15" />
          </motion.div>
        ) : type == 'file' ? (
          <BsFileEarmarkCode size="15" />
        ) : type == 'folder' && open ? (
          <AiFillFolderOpen size="20" />
        ) : (
          <AiFillFolder size="20" />
        )}
      </span>
      <p className="group-hover:text-yellow-700 dark:text-gray-200">{name}</p>
    </div>
  );
}
function Arrow({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.span
      className="absolute  -left-1"
      initial={{ rotate: -90 }}
      animate={{ rotate: isOpen ? -90 : 0 }}
    >
      <RiArrowDownSLine />
    </motion.span>
  );
}

export default FileFolderContent;
