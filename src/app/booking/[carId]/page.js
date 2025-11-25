
'use client'

import { useParams, useRouter } from 'next/navigation';
import styles from '@/app/booking/booking.module.css';
import { dummyCars } from '@/lib/dummyData';
import { useState } from 'react';

export default function BookingPage() {
  const router = useRouter();
  const { carId } = useParams();
  const car = dummyCars.find(c => c.id === parseInt(carId));
  const [coupon, setCoupon] = useState('');

  if (!car) {
    return <p>車両が見つかりません</p>;
  }

  const handleConfirmBooking = () => {
    // In a real application, you would validate the coupon here.
    router.push('/booking/confirmed');
  };

  return (
    <div className={styles.container}>
      <h1>予約確認</h1>
      <div className={styles.carDetails}>
        <h2>{car.make} {car.model}</h2>
        <p>タイプ: {car.type}</p>
        <p>店舗: {car.store}</p>
      </div>

      <div className={styles.couponContainer}>
        <label htmlFor="coupon">クーポンコード</label>
        <div className={styles.couponInputWrapper}>
          <input 
            type="text" 
            id="coupon" 
            value={coupon} 
            onChange={(e) => setCoupon(e.target.value)} 
            placeholder="クーポンコードを入力"
          />
          <button className={styles.applyButton}>適用</button>
        </div>
      </div>

      <button onClick={handleConfirmBooking} className={styles.confirmButton}>予約を確定する</button>
    </div>
  );
}
