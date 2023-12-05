import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MetronomeListPage } from './pages/MetronomeListPage';
import { HomePage } from './pages/HomePage';
import {
  MusicPalDexie,
  StorageContextProvider,
} from './components/storage.context';
import { AppContextProvider } from './components/app.context';
import { MetronomePlayerPage } from './pages/MetronomePlayerPage';
import { SightEarPage } from './pages/SightEarPage';
import { TunerPage } from './pages/TunerPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/metronome',
      element: <MetronomeListPage />,
    },
    {
      path: '/metronome/:id',
      element: <MetronomePlayerPage />,
    },
    {
      path: '/sightear',
      element: <SightEarPage />,
    },
    {
      path: '/tuner',
      element: <TunerPage />,
    },
  ],
  {
    basename: '/MusicPal',
  },
);

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
