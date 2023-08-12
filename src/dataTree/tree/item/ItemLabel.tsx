import { useRecoilState } from 'recoil';
import { ItemType, isOpenAtom, selectedAtom } from '../../atoms';
import Arrow from '../../components/Arrow';
import ItemContent from './ItemContent';

function ItemLabel({
  type,
  name,
  id,
  parent,
}: {
  type: ItemType;
  id: string;
  name: string;
  parent: string;
}) {
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [isOpen, setIsOpen] = useRecoilState(isOpenAtom(id));

  return (
    <div
      onClick={() => {
        setSelected(id);
        setIsOpen((s) => !s);
      }}
      className={`cursor-pointer border  pl-3  hover:bg-gray-400/30  relative   flex  items-center space-x-2
  ${selected == id ? 'border-blue-500' : 'border-transparent'}`}
    >
      {type == 'folder' ? (
        <>
          <Arrow isOpen={isOpen} /> <span className="w-4 h-4 bg-yellow-400" />
        </>
      ) : (
        <span className="w-4 h-4 bg-gray-400" />
      )}
      <ItemContent name={name} id={id} parent={parent} type={type} />
    </div>
  );
}

export default ItemLabel;
