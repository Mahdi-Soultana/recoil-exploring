import React from 'react';
import { useRecoilValue } from 'recoil';
import FileFolder from './FileFolder';
import { childFamily, childOpen } from './atoms';
import { useCreateChild } from './hooks';
import { createDummyFiles } from './utils';
function Item({ id, parentId }: { id: string; parentId: string }) {
  const open = useRecoilValue(childOpen(id));
  const item = useRecoilValue(childFamily(id));
  const createChild = useCreateChild({ id, parentId });

  if (!item || !createChild) return null;

  const { type, name, children } = item;

  return (
    <li
      id={id}
      style={{
        height: type == 'folder' ? (open ? '100%' : '1.45rem') : '100%',
        overflow: 'hidden',
      }}
    >
      <FileFolder
        onOpen={() => {
          createChild(createDummyFiles(id), type);
        }}
        name={name}
        type={type}
        id={id}
      />
      <ul>
        {children
          ? children.map((i, ind) => <Item id={i.id} key={ind} parentId={id} />)
          : null}
      </ul>
    </li>
  );
}
//@ts-ignore
Item = React.memo(Item);

export default Item;
