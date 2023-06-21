import React from 'react';
import moment from 'moment';
import { Todo, TodosAtom } from './todos-atoms';
import { useSetRecoilState } from 'recoil';
function TodoItem({ todo }: { todo: Todo }) {
  const setTodos = useSetRecoilState(TodosAtom);
  return (
    <label className="w-[77%] border justify-between m-auto border-blue-200 items-center   cursor-pointer mt-6 hover:border-blue-500 flex space-x-4 p-4 rounded ">
      <input
        onChange={(e) => {
          setTodos((todos) =>
            [...todos].map((item) =>
              item.id == todo.id
                ? { ...todo, completed: e.target.checked }
                : item,
            ),
          );
        }}
        type="checkbox"
        name="todo-check"
        id="todo-check"
        checked={todo.completed}
        className="block w-5 h-5"
      />
      <p className=" ">{todo.value}</p>
      <p className="text-sm ">
        {moment(todo.date, 'YYYY-MM-DD').format('YYYY-MMM-dddd')}
      </p>
      <button
        onClick={() => {
          setTodos((todos) => [...todos].filter((item) => item.id !== todo.id));
        }}
        className="hover:bg-red-500 hover:text-white p-1 text-red-500 ml-10 text-xs font-bold"
      >
        Delete
      </button>
    </label>
  );
}

export default TodoItem;
