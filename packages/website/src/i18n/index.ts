import { readFileSync } from 'fs'
import { FluentResource } from "@fluent/bundle";

export const enUS = new FluentResource(readFileSync(__dirname + './en-US.ftl', 'utf-8'));
export const zhCN = new FluentResource(readFileSync(__dirname + './zh-CN.ftl', 'utf-8'));

export const RESOURCES: Record<string, FluentResource> = {
    en: enUS,
    "en-US": enUS,
    "zh-CN": zhCN,
    zh: zhCN,
};
