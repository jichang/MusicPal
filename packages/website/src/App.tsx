import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Metronome } from '@musicpal/metronome';
import { Home } from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/metronome",
    element: <Metronome />
  }
]);

export function App() {
  return <RouterProvider router={router} />
}
