import { atom, selector, selectorFamily } from 'recoil';
import { v4 as id } from 'uuid';
export interface Todo {
  id: string;
  value: string;
  completed: boolean;
  date: Date;
}

const TodosAtom = atom<Todo[]>({
  key: 'todosAtom',
  default: [
    { id: id(), value: 'learn react', date: new Date(), completed: true },
    { id: id(), value: 'learn Remix', date: new Date(), completed: false },
    { id: id(), value: 'learn Recoil', date: new Date(), completed: false },
  ],
  effects: [
    (pram) => {
      const localdate = localStorage.getItem(pram.node.key);
      if (localdate !== null) {
        const initTodos: Todo[] = JSON.parse(localdate);
        console.log('setSef', initTodos);
        pram.setSelf(initTodos);
      }

      pram.onSet((newValue, oldVal) => {
        localStorage.setItem(pram.node.key, JSON.stringify(newValue));
      });
    },
  ],
});

const TodoAtom = atom<Todo[] | null>({
  key: 'todoAtom-' + id(),
  default: null,
});
export type FilterType = 'all' | 'completed' | 'uncompleted';
export const filterAtom = atom<FilterType>({
  key: 'filteratom' + id(),
  default: 'all',
});
const TodosFilter = selectorFamily<Todo[], FilterType>({
  key: 'todosFilter-' + id(),
  get:
    (paramFilter) =>
    ({ get }) => {
      const todos = get(TodosAtom);
      // console.log(paramFilter, todos);
      const completedTodos = todos.filter((todo) => todo.completed);
      const uncompletedTodos = todos.filter((todo) => !todo.completed);
      switch (paramFilter) {
        case 'all':
          return todos;
        case 'completed':
          return completedTodos;
        case 'uncompleted':
          return uncompletedTodos;
        default: {
          return [];
        }
      }
    },
});

const TodosStat = selector({
  key: 'todosFilter-' + id(),
  get: ({ get }) => {
    const todos = get(TodosAtom);

    const completedTodos = todos.filter((todo) => todo.completed).length;
    const totallTodos = todos.length;
    const percentageCompletedTodos = (
      isNaN(completedTodos / totallTodos) ? 0 : completedTodos / totallTodos
    ).toFixed(2);

    return {
      completedTodos,
      totallTodos,
      percentageCompletedTodos: +percentageCompletedTodos * 100 + '%',
    };
  },
});

export { TodosFilter, TodosAtom, TodoAtom, TodosStat };
