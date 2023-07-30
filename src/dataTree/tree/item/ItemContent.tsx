import { useRecoilValue } from 'recoil';
import { itemStateFamily, selectedAtom } from '../../atoms';
import ItemInput from './ItemInput';

function ItemContent({ name }: { name: string }) {
  const id = useRecoilValue(selectedAtom);
  const item = useRecoilValue(itemStateFamily(id));

  return <>{false ? <p>{name}</p> : <ItemInput />}</>;
}

export default ItemContent;
