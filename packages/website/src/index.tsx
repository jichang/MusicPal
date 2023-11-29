import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { MusicPalDexie } from "./components/storage.context";
import "intl-polyfill";

const container = document.getElementById("app") as HTMLDivElement;
const root = createRoot(container);
const dexie = new MusicPalDexie();

dexie.rhythms
  .toArray()
  .then((rhythms) => {
    if (rhythms.length === 0) {
      return dexie.init();
    }
  })
  .then(() => {
    root.render(
      <React.StrictMode>
        <App dexie={dexie} />
      </React.StrictMode>
    );
  });
