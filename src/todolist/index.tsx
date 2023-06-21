import React from 'react';
import CreateTodo from './CreateTodo';
import TodoFilter from './TodoFilter';
import TodosItems from './TodosItems';
import TodoStat from './TodoStat';

function TodoListApp() {
  return (
    <div className="max-w-2xl  w-full min-h-screen p-5 pt-0">
      <TodoStat />
      <div className="flex justify-around w-full  m-auto   mt-10">
        <CreateTodo />
        <TodoFilter />
      </div>
      <TodosItems />
    </div>
  );
}

export default TodoListApp;
