import { useRecoilValue } from 'recoil';
import { Item as ItemTs, isOpenAtom, itemStateFamily } from '../../atoms';
import ItemLabel from './ItemLabel';

function Item({
  id,
  type: typeProp,
  parent,
}: { id: string } & Partial<ItemTs>) {
  const item = useRecoilValue(itemStateFamily(id));
  // console.log({ item });
  const isOpen = useRecoilValue(isOpenAtom(id));

  const { name, type, children } = item;
  return (
    <li>
      <ItemLabel
        name={name}
        parent={parent || 'root'}
        type={typeProp || 'folder'}
        id={id}
      />
      {children && children.length > 0 && (
        <ul
          className="pl-4 border-l border-gray-500/30"
          style={{
            height: isOpen ? 'auto' : 0,
            overflow: isOpen ? 'visible' : 'hidden',
          }}
        >
          {children.map((item, i) => (
            <Item key={i} id={item.id} type={item.type} parent={id} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Item;
