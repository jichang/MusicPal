import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MetronomePage } from "./pages/MetronomePage";
import { HomePage } from "./pages/HomePage";
import {
  MusicPalDexie,
  StorageContextProvider,
} from "./components/storage.context";
import { AppContextProvider } from "./components/app.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/metronome",
    element: <MetronomePage />,
  },
  {
    path: "/metronome/create",
    element: <></>,
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
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </StorageContextProvider>
  );
}
