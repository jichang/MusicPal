import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { generateBundles, getDefaultLocale } from '../i18n';
import { LocalizationProvider, ReactLocalization } from '@fluent/react';
import React from 'react';

export const LOCALE_STORAGE_KEY = 'musicalpal.locale';

export interface IAppContextValue {
  audioContext?: AudioContext | undefined;
  setupAudioContext: () => void;
  locale: string;
  changeLocale: (locale: string) => void;
}

export const AppContext = createContext<IAppContextValue>({
  locale: 'en-US',
  changeLocale: () => {},
  setupAudioContext: () => {},
});

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export function AppContextProvider(props: AppContextProviderProps) {
  const { children } = props;
  const [locale, setLocale] = useState(() => {
    try {
      const locale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (!locale) {
        return getDefaultLocale();
      } else {
        return locale;
      }
    } catch (e) {
      return getDefaultLocale();
    }
  });
  const [l10n, setL10n] = useState(() => {
    return new ReactLocalization(generateBundles(locale));
  });

  const changeLocale = useCallback(
    (locale: string) => {
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      } finally {
        setLocale(locale);
        setL10n(new ReactLocalization(generateBundles(locale)));
      }
    },
    [setL10n],
  );

  const [audioContext, setAudioContext] = useState<AudioContext>();

  const setupAudioContext = useCallback(async () => {
    const audioContext = new AudioContext();
    setAudioContext(audioContext);
  }, [setAudioContext]);

  useEffect(() => {
    return () => {
      if (audioContext?.state === 'running') {
        audioContext?.close();
      }
    };
  }, [audioContext]);

  return (
    <AppContext.Provider
      value={{ audioContext, setupAudioContext, locale, changeLocale }}
    >
      <LocalizationProvider l10n={l10n}>{children}</LocalizationProvider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
