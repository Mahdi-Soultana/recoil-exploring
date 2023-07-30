import React from 'react';
import { useRecoilValue } from 'recoil';
import { childFamily, childOpen } from './atoms';
import FileFolder from './fileFolder/FileFolder';
import { useCreateChild } from './hooks';
function Item({ id, parentId }: { id: string; parentId: string }) {
  const open = useRecoilValue(childOpen(id));
  const item = useRecoilValue(childFamily(id));
  const createChild = useCreateChild({ id, parentId });

  if (!item || !createChild) return null;
  console.log(item);
  const { type, children, name } = item;

  return (
    <li
      id={id}
      style={{
        height:
          name == `rename ${type}`
            ? '100%'
            : type == 'folder'
            ? open
              ? '100%'
              : '1.3rem'
            : '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* {type == 'folder' && (
        <span className="w-[1px] h-full absolute left-0 top-0 bg-gray-500" />
      )} */}
      <FileFolder parentId={parentId} id={id} />
      {type == 'folder' ? (
        <ul className="pb-[3px]">
          {children
            ? children.map((i, ind) => (
                <Item id={i.id} key={ind} parentId={id} />
              ))
            : null}
        </ul>
      ) : children ? (
        children.map((i, ind) => <Item id={i.id} key={ind} parentId={id} />)
      ) : null}
    </li>
  );
}
//@ts-ignore
Item = React.memo(Item);

export default Item;
