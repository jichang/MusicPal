import { readFileSync } from "fs";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";

export const enUS = new FluentResource(
  readFileSync(__dirname + "./en-US.ftl", "utf-8"),
);
export const zhCN = new FluentResource(
  readFileSync(__dirname + "./zh-CN.ftl", "utf-8"),
);

export const RESOURCES: Record<string, FluentResource> = {
  en: enUS,
  "en-US": enUS,
  "zh-CN": zhCN,
  zh: zhCN,
};

export const RESOURCES_LABELS: Record<string, string> = {
  en: "English",
  "en-US": "English",
  "zh-CN": "简体中文",
  zh: "简体中文",
};

// A generator function responsible for building the sequence
// of FluentBundle instances in the order of user's language
// preferences.
export function* generateBundles(locale: string) {
  const bundle = new FluentBundle(locale);
  bundle.addResource(RESOURCES[locale]);
  yield bundle;
}

export function getDefaultLocale() {
  const currentLocales = negotiateLanguages(
    ["en-US", "zh-CN"],
    Object.keys(RESOURCES),
    {
      defaultLocale: "en-US",
    },
  );

  return currentLocales[0];
}
