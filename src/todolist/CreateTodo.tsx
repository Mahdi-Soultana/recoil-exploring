import React, { FormEvent, FormEventHandler, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TodosAtom } from './todos-atoms';
import { v4 } from 'uuid';
import { backgroundAtom } from '../AppContainer';

function CreateTodo() {
  const setTodos = useSetRecoilState(TodosAtom);
  const background = useRecoilValue(backgroundAtom);
  const [value, setValue] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!(value.length > 3)) {
      return;
    }
    setTodos((todos) => [
      { id: v4(), value: value, date: new Date(), completed: false },
      ...todos,
    ]);
    setValue('');
  }
  return (
    <form onSubmit={onSubmit} className="flex w-[350px] h-[2.4rem]   m-auto">
      <input
        value={value}
        className={`${
          background ? 'text-green-600' : 'text-gray-900'
        } w-full p-3 h-full font-medium rounded  outline-none border-2 border-r-0 text-lg block`}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={`rounded-r ${
          background ? 'bg-green-600' : 'bg-blue-400'
        } w-12 h-[2.4rem] font-medium outline-none border-none  hover:opacity-60 active:opacity-100`}
      >
        add
      </button>
    </form>
  );
}

export default CreateTodo;
