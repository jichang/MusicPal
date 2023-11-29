import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Metronome } from "./components/metronome/Metronome";
import { Home } from "./components/Home";
import {
  MusicPalDexie,
  StorageContextProvider,
} from "./components/storage.context";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";

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
  l10n: ReactLocalization;
}

export function App(props: AppProps) {
  const { dexie, l10n } = props;

  return (
    <StorageContextProvider dexie={dexie}>
      <LocalizationProvider l10n={l10n}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </StorageContextProvider>
  );
}
