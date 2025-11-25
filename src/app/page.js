
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [carType, setCarType] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [store, setStore] = useState('');

  const handleSearch = () => {
    const query = {
      carType,
      pickupDate,
      returnDate,
      store,
    };

    Object.keys(query).forEach(key => {
      if (!query[key]) {
        delete query[key];
      }
    });

    const queryString = new URLSearchParams(query).toString();
    router.push(`/search?${queryString}`);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>お気に入りのレンタカーを見つけよう</h1>
          <p>数分でレンタカーを予約できます</p>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchForm}>
            <div className={styles.formGroup}>
              <label htmlFor="carType">車種</label>
              <select id="carType" value={carType} onChange={(e) => setCarType(e.target.value)}>
                <option value="">車種を選択</option>
                <option value="sedan">セダン</option>
                <option value="suv">SUV</option>
                <option value="truck">トラック</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pickupDate">利用開始日</label>
              <input type="date" id="pickupDate" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="returnDate">返却日</label>
              <input type="date" id="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="store">店舗</label>
              <select id="store" value={store} onChange={(e) => setStore(e.target.value)}>
                <option value="">店舗を選択</option>
                <option value="store1">店舗1</option>
                <option value="store2">店舗2</option>
                <option value="store3">店舗3</option>
              </select>
            </div>

            <button onClick={handleSearch} className={styles.searchButton}>検索</button>
          </div>
        </div>
      </main>
    </div>
  );
}
