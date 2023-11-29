import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Metronome } from "./components/metronome/Metronome";
import { Home } from "./components/Home";
import {
  MusicPalDexie,
  StorageContextProvider,
} from "./components/storage.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/metronome",
    element: <Metronome />,
  },
  {
    path: "/metronome/:id",
    element: <></>,
  },
]);

export interface AppProps {
  dexie: MusicPalDexie;
}

export function App(props: AppProps) {
  const { dexie } = props;

  return (
    <StorageContextProvider dexie={dexie}>
      <RouterProvider router={router} />
    </StorageContextProvider>
  );
}
