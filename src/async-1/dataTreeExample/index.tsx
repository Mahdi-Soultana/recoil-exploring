import Item from './Item';
import { Tree } from './atoms';
import './style.css';
import Toolbar from './toolbar/Toolbar';
function DataTreeExample() {
  return (
    <>
      <Toolbar />
      <ul>
        <Item id={'root'} parentId="root" />
      </ul>
      {/* <Selected /> */}
    </>
  );
}
// function Selected() {
//   const selected = useRecoilValue(selectedAtom);
//   // console.log(selected);
//   return <></>;
// }
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
