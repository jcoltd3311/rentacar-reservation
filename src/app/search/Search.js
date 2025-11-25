
'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import styles from './search.module.css';
import { dummyCars } from '@/lib/dummyData';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carType = searchParams.get('carType');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const store = searchParams.get('store');

  const availableCars = dummyCars.filter(car => {
    if (carType && car.type !== carType) {
      return false;
    }
    if (store && car.store !== store) {
      return false;
    }
    return true;
  });

  const handleBookNow = (carId) => {
    router.push(`/booking/${carId}`);
  };

  return (
    <div className={styles.container}>
      <h1>利用可能な車両</h1>
      <div className={styles.carList}>
        {availableCars.length > 0 ? (
          availableCars.map(car => (
            <div key={car.id} className={styles.carItem}>
              <h2>{car.make} {car.model}</h2>
              <p>タイプ: {car.type}</p>
              <p>店舗: {car.store}</p>
              <button onClick={() => handleBookNow(car.id)} className={styles.bookButton}>今すぐ予約</button>
            </div>
          ))
        ) : (
          <p>選択した条件で利用可能な車両はありません。</p>
        )}
      </div>
    </div>
  );
}
