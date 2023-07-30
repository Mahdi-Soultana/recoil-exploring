import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import AppContainer, { backgroundAtom } from './AppContainer';
import Asyn1 from './async-1/Asyn1';
import ThemeMode from './darkLightMode/App';
import DataTree from './dataTree/DataTree';
import TodoListApp from './todolist';

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
      {
        path: 'datatree',
        element: <DataTree />,
      },
    ],
  },
]);

function App() {
  const isDark = useRecoilValue(backgroundAtom);
  return (
    <div className={isDark ? 'dark' : ''}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
