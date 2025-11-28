
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './options.module.css';

const optionsList = [
  { id: 'child_seat', name: 'チャイルドシート', price: 1000 },
  { id: 'junior_seat', name: 'ジュニアシート', price: 1000 },
  { id: 'baby_seat', name: 'ベビーシート', price: 1000 },
  { id: 'gps', name: 'カーナビ', price: 500 },
  { id: 'etc', name: 'ETCカード', price: 300 },
];

export default function OptionsPage() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (optionId) => {
    setSelectedOptions(prev =>
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  };

  const calculateTotal = () => {
    return selectedOptions.reduce((total, optionId) => {
      const option = optionsList.find(o => o.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);
  };

  const handleNext = () => {
    // Pass selected options to the next page
    router.push('/reception/disclaimer-compensation');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>オプション選択</h1>
      <div className={styles.optionsGrid}>
        {optionsList.map(option => (
          <div
            key={option.id}
            className={`${styles.optionCard} ${selectedOptions.includes(option.id) ? styles.selected : ''}`}
            onClick={() => handleOptionToggle(option.id)}
          >
            <h3>{option.name}</h3>
            <p>+ ¥{option.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>選択中のオプション</h2>
        <p>合計金額: ¥{calculateTotal().toLocaleString()}</p>
      </div>

      <button onClick={handleNext} className={styles.nextButton}>
        次へ進む
      </button>
    </div>
  );
}

