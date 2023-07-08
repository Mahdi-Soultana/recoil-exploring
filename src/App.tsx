import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExploringRecoil from './darkLightMode/App';
import AppContainer from './AppContainer';
import ThemeMode from './darkLightMode/App';
import TodoListApp from './todolist';
import Asyn1 from './async-1/Asyn1';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        path: '/',
        element: <p className="text-2xl ">Learning Recoil with TS 🟦 </p>,
      },
      {
        path: 'themeMode',
        element: <ThemeMode />,
      },
      {
        path: 'todoapp',
        element: <TodoListApp />,
      },
      {
        path: 'async1',
        element: <Asyn1 />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
