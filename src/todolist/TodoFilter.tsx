import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import TodoStat from './TodoStat';
import { TodosFilter, filterAtom } from './todos-atoms';
import { backgroundAtom } from '../AppContainer';

function TodoFilter() {
  const [filter, setFilter] = useRecoilState(filterAtom);
  const background = useRecoilValue(backgroundAtom);
  return (
    <select
      className={`${
        background ? 'text-green-600' : 'text-gray-900'
      } rounded border-2 p-2`}
      value={filter}
      onChange={(e) => {
        const value = e.target.value as 'all' | 'completed' | 'uncompleted';

        setFilter(value);

        // setFilterTodos(value)
      }}
    >
      <option value="all">All</option>
      <option value="completed">completed</option>
      <option value="uncompleted">uncompleted</option>
    </select>
  );
}

export default TodoFilter;
