import { useRecoilValue } from 'recoil';
import { v4 } from 'uuid';
import Item from './Item';
import { Tree, selectedAtom } from './atoms';
import './style.css';
function DataTreeExample() {
  return (
    <>
      <ul>
        <Item id={v4()} parentId="root" />
        <Item id={v4()} parentId="root" />
        <Item id={v4()} parentId="root" />
      </ul>
      <Selected />
    </>
  );
}
function Selected() {
  const selected = useRecoilValue(selectedAtom);
  console.log(selected);
  return <></>;
}
const GenerateTree = ({ tree }: { tree: Tree }) => {
  return <></>;
};

export default DataTreeExample;

// const generateTree = (): Child[] => {
//   return [...new Array(5)].map((_, i) => ({
//     id: v4(),
//     name: i + '.js',
//     children: null,
//     type: 'file',
//   }));
// };
