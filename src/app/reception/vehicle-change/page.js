
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './vehicle-change.module.css';

const currentCar = {
  name: 'トヨタ・ヤリス',
  class: 'コンパクト',
  imageUrl: '/images/car_yaris.png' // Placeholder image
};

const upgradeCar = {
  name: 'トヨタ・クラウン',
  class: 'セダン',
  imageUrl: '/images/car_crown.png', // Placeholder image
  upgradeFee: 3000
};

export default function VehicleChangePage() {
  const router = useRouter();

  const handleSelection = (isUpgrade) => {
    // In a real app, you would save this choice and update the booking
    console.log(`Upgrade selected: ${isUpgrade}`);
    router.push('/reception/final-confirm');
  };

  return (
    <div className={styles.container}>
      <h1>アップグレードのご提案</h1>
      <p>現在ご予約の車両から、より快適なセダンタイプへのアップグレードはいかがですか？</p>

      <div className={styles.optionsContainer}>
        <div className={styles.optionCard}>
          <h2>現在ご予約の車両</h2>
          {/* <img src={currentCar.imageUrl} alt={currentCar.name} className={styles.carImage} /> */}
          <h3>{currentCar.name}</h3>
          <p>{currentCar.class}クラス</p>
          <button onClick={() => handleSelection(false)} className={styles.keepButton}>
            このままの車両で進む
          </button>
        </div>

        <div className={styles.optionCard}>
          <h2>アップグレード対象</h2>
          {/* <img src={upgradeCar.imageUrl} alt={upgradeCar.name} className={styles.carImage} /> */}
          <h3>{upgradeCar.name}</h3>
          <p>{upgradeCar.class}クラス</p>
          <p className={styles.upgradeFee}>+ ¥{upgradeCar.upgradeFee.toLocaleString()} (1日あたり)</p>
          <button onClick={() => handleSelection(true)} className={styles.upgradeButton}>
            この車両にアップグレード
          </button>
        </div>
      </div>
    </div>
  );
}
