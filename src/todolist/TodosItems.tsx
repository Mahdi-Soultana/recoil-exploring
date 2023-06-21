import React from 'react';
import { useRecoilValue } from 'recoil';
import { TodosFilter, filterAtom } from './todos-atoms';
import TodoItem from './TodoItem';

function TodosItems() {
  const filter = useRecoilValue(filterAtom);
  const todos = useRecoilValue(TodosFilter(filter));
  return todos.map((todo) => <TodoItem todo={todo} key={todo.id} />);
}

export default TodosItems;
