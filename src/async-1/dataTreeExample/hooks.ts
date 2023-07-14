import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { Child, childFamily, selectedAtom } from './atoms';

export function useCreateChild({
  id,
  parentId,
}: {
  parentId: string;
  id: string;
}) {
  const setSelect = useSetRecoilState(selectedAtom);
  const item = useRecoilValue(childFamily(id));

  if (!item) return;
  const { name, children } = item;
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
  return callback;
}
