import React, { useState } from 'react';
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import FileFolder from './FileFolder';
import { Child, childFamily, selectedAtom } from './atoms';
function Item({ id, parentId }: { id: string; parentId: string }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useRecoilState(childFamily(id));
  // console.log({ parentId });
  if (!item) return null;

  const { type, name } = item;
  const setSelect = useSetRecoilState(selectedAtom);
  const selecting = (type: 'folder' | 'file') => {};
  const callback = useRecoilCallback(
    ({ set }) =>
      (item: Child, type: 'file' | 'folder') => {
        if (name == 'loading...') {
          if (item.type == 'folder') {
            setSelect({ folder: item.id, file: null });
          } else {
            setSelect({ folder: parentId, file: item.id });
          }
        } else {
          if (type == 'folder') {
            setSelect({ folder: item.id, file: null });
          } else {
            setSelect({ folder: parentId, file: item.id });
          }
        }

        if (children !== null) return;
        set(childFamily(id), item);
      },
    [name],
  );

  const children = item.children;
  const rn = Math.random() - 0.5 < 0 ? true : false;
  return (
    <li
      id={id}
      draggable
      // onDrag={(e) => {
      //   console.log(e.target);
      // }}
      onDragEnter={(e) => {
        console.log(e.currentTarget);
      }}
      style={{
        height: type == 'folder' ? (open ? '100%' : '1.45rem') : '100%',
      }}
      className=" overflow-hidden   "
    >
      <FileFolder
        onOpen={async ({ id, type }) => {
          callback(
            {
              id,
              name: rn ? 'src' : 'index.js',
              type: rn ? 'folder' : 'file',
              // we pass a children of an array after a request or a click in this case👍👍👍
              children: rn
                ? [
                    { id: v4(), children: null },
                    { id: v4(), children: null },
                  ]
                : [],
            },
            type,
          );
        }}
        name={name}
        setOpen={setOpen}
        open={open}
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
