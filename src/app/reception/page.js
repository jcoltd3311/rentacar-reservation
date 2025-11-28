
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './reception.module.css';

const ReceptionPage = () => {
  const [bookingId, setBookingId] = useState('');
  const router = useRouter();

  const handleStartReception = (e) => {
    e.preventDefault();
    if (bookingId) {
      // 実際のアプリケーションでは、ここで予約番号の有効性を確認します。
      // 次のステップに予約番号を渡します。
      router.push(`/reception/disclaimer-compensation?bookingId=${bookingId}`);
    } else {
      alert('予約番号を入力してください。');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.receptionBox}>
        <h1 className={styles.title}>ようこそ！</h1>
        <p className={styles.subtitle}>ご予約の受付を開始します。予約番号を入力してください。</p>
        <form onSubmit={handleStartReception} className={styles.form}>
          <input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            placeholder="予約番号"
            className={styles.input}
          />
          <button type="submit" className={styles.startButton}>
            受付開始
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReceptionPage;
