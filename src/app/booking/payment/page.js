
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './payment.module.css';

const PaymentPage = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const details = sessionStorage.getItem('bookingDetails');
    if (details) {
      setBookingDetails(JSON.parse(details));
    }
  }, []);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    // ここで実際の決済処理と予約確定処理を呼び出します
    console.log("Booking confirmed:", bookingDetails);
    alert("予約が完了しました！");
    router.push('/booking/confirmation');
  };

  if (!bookingDetails) {
    return <p className={styles.loading}>予約情報を読み込んでいます...</p>;
  }

  const { car, rentalDays, selectedOptions, totalPrice } = bookingDetails;

  return (
    <div className={styles.container}>
      <div className={styles.summarySection}>
        <h1 className={styles.title}>予約内容の確認</h1>
        <div className={styles.summaryDetails}>
          <h2>{`${car.make} ${car.model}`}</h2>
          <p>レンタル日数: {rentalDays}日間</p>
          <p>オプション: {selectedOptions.map(opt => opt.name).join(', ') || 'なし'}</p>
          <p className={styles.totalPrice}>合計金額: &yen;{totalPrice.toLocaleString()}</p>
        </div>
      </div>

      <div className={styles.paymentSection}>
        <h1 className={styles.title}>お支払い情報の入力</h1>
        <form onSubmit={handleConfirmBooking} className={styles.paymentForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="card-name">カード名義</label>
            <input type="text" id="card-name" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="card-number">カード番号</label>
            <input type="text" id="card-number" placeholder="0000 0000 0000 0000" required />
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="expiry-date">有効期限</label>
              <input type="text" id="expiry-date" placeholder="MM/YY" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" placeholder="123" required />
            </div>
          </div>
          <button type="submit" className={styles.confirmButton}>予約を確定する</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
