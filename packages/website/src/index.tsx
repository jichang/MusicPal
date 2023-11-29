import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { MusicPalDexie } from "./components/storage.context";
import "intl-polyfill";
import { negotiateLanguages } from "@fluent/langneg";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import { ReactLocalization } from "@fluent/react";
import { RESOURCES, enUS, zhCN } from "./i18n";

// A generator function responsible for building the sequence
// of FluentBundle instances in the order of user's language
// preferences.
function* generateBundles(userLocales: readonly string[]) {
  // Choose locales that are best for the user.
  const currentLocales = negotiateLanguages(
    userLocales,
    Object.keys(RESOURCES),
    { defaultLocale: "en-US" }
  );

  for (const locale of currentLocales) {
    const bundle = new FluentBundle(locale);
    bundle.addResource(RESOURCES[locale]);
    yield bundle;
  }
}

// The ReactLocalization instance stores and caches the sequence of generated
// bundles. You can store it in your app's state.
let l10n = new ReactLocalization(generateBundles(navigator.languages));

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
        <App dexie={dexie} l10n={l10n} />
      </React.StrictMode>
    );
  });
