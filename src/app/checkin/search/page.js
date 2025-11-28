'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './search.module.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// I18n
import { useI18n } from '../../../locales/client';

// Firebase
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function SearchPage() {
  const router = useRouter();
  const t = useI18n();

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // エラーメッセージは汎用的なものを表示
      setError(t('search_page.error_general')); 
      return;
    }

    setIsLoading(true);
    setError('');

    try {
        const q = query(collection(db, "bookings"), where("tel", "==", searchTerm));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const bookingId = querySnapshot.docs[0].id;
          router.push(`/checkin/${bookingId}/scan`);
        } else {
          setError(t('search_page.error_not_found'));
        }
    } catch (err) {
      console.error('Error searching booking:', err);
      setError(t('search_page.error_general'));
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWidget}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('search_page.title')}</h1>
          <p className={styles.subtitle}>{t('search_page.subtitle')}</p>
        </div>

        <div className={styles.tabContainer}>
          {/* 電話番号検索のみに絞る */}
          <button className={`${styles.tab} ${styles.active}`}>
            {t('search_page.phone_tab')}
          </button>
        </div>

        <div className={styles.inputGroup}>
          <input 
            type="tel"
            placeholder={t('search_page.placeholder')}
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            disabled={isLoading}
          />
          <button onClick={handleSearch} className={styles.searchButton} disabled={isLoading}>
            {isLoading ? (
                <div className={styles.loader}></div>
            ) : (
                <MagnifyingGlassIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {error && <p className={styles.errorMessage}>{error}</p>}

      </div>
    </div>
  );
}
