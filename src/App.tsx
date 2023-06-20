import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExploringRecoil from './darkLightMode/App';
import AppContainer from './AppContainer';
import ThemeMode from './darkLightMode/App';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
