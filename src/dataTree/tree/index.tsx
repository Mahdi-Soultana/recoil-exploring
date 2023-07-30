import { useRecoilValue } from 'recoil';
import { treeState } from '../atoms';
import Item from './item';

function Tree() {
  const tree = useRecoilValue(treeState);
  return (
    <ul>
      {tree.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </ul>
  );
}

export default Tree;
