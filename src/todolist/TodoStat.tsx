import React from 'react';
import { useRecoilValue } from 'recoil';
import { TodosStat } from './todos-atoms';

function TodoStat() {
  const { totallTodos, percentageCompletedTodos } = useRecoilValue(TodosStat);
  return (
    <div className="flex justify-center items-center space-x-20 font-base capitalize">
      <p>totallTodos: {totallTodos}</p>
      <p>todosProgress: {percentageCompletedTodos}</p>
    </div>
  );
}

export default TodoStat;
