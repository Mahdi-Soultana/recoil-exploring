import { useRecoilValue } from 'recoil';
import { isOpenAtom, itemStateFamily, treeItem } from '../../atoms';
import ItemLabel from './ItemLabel';

function Item({ id, children }: treeItem) {
  const item = useRecoilValue(itemStateFamily(id));

  const isOpen = useRecoilValue(isOpenAtom(id));

  const { name, type } = item;
  return (
    <li>
      <ItemLabel name={name} type={type} id={id} />
      {children && children.length > 0 && (
        <ul
          className="pl-4 border-l border-gray-500/30"
          style={{
            height: isOpen ? 'auto' : 0,
            overflow: isOpen ? 'auto' : 'hidden',
          }}
        >
          {children.map((item, i) => (
            <Item key={i} {...item} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Item;
