import { v4 } from 'uuid';
import { Child } from './atoms';

export function createDummyFiles(id: string): Child {
  const rn = Math.random() - 0.5 < 0 ? true : false;
  const data: Child = {
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
  };

  return data;
}
