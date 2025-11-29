'use client';
import { createI18nClient } from 'next-international/client';
import en from './en';
import ja from './ja';

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
  en: () => import('./en'),
  ja: () => import('./ja'),
});
