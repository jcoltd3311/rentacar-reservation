'use client';

import { useChangeLocale, useCurrentLocale } from '../locales/client';
import styles from './LanguageSwitcher.module.css';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  return (
    <div className={styles.switcherContainer}>
        <LanguageIcon className="h-5 w-5 text-gray-600 mr-2" />
        <button 
            onClick={() => changeLocale('ja')} 
            className={currentLocale === 'ja' ? styles.active : styles.inactive}
        >
            日本語
        </button>
        <span className={styles.separator}>|</span>
        <button 
            onClick={() => changeLocale('en')} 
            className={currentLocale === 'en' ? styles.active : styles.inactive}
        >
            English
        </button>
    </div>
  );
}
