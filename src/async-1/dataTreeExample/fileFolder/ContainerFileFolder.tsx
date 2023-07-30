import { useRecoilState, useRecoilValue } from 'recoil';
import { childFamily, selectedAtom } from '../atoms';

const ContainerFileFolder = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const item = useRecoilValue(childFamily(id));
  if (!item) return null;
  return (
    <div
      onClick={() => {
        if (item.type === 'file') {
          setSelected((prevSelected) => ({
            file: id,
            folder: prevSelected?.folder,
          }));
        } else {
          setSelected({ file: null, folder: id });
        }
      }}
      className={`${
        selected?.file == id
          ? 'bg-gray-200 dark:bg-gray-700 border rounded '
          : selected?.folder == id
          ? ' border-l-blue-600/50  dark:border-l-blue-500  '
          : ''
      } px-1 border-l-[2px]  cursor-pointer `}
    >
      {children}
    </div>
  );
};

export default ContainerFileFolder;
