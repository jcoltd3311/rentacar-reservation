
'use client'

import { useSearchParams } from 'next/navigation';
import styles from './payment.module.css';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const name = searchParams.get('name');
  const address = searchParams.get('address');
  const phone = searchParams.get('phone');
  const email = searchParams.get('email');
  const coupon = searchParams.get('coupon');
  const totalPrice = searchParams.get('totalPrice');

  const handlePayment = () => {
    // In a real application, you would handle payment processing here.
    alert('予約が完了しました。');
    // Redirect to a confirmation page
    window.location.href = `/booking/confirmed?name=${name}`;
  };

  return (
    <div className={styles.container}>
      <h1>決済画面</h1>
      
      <div className={styles.details}>
        <h2>予約内容</h2>
        <p><strong>車種:</strong> {carId}</p>
        <p><strong>利用開始日時:</strong> {pickupDate}</p>
        <p><strong>返却日時:</strong> {returnDate}</p>
        <p><strong>氏名:</strong> {name}</p>
        <p><strong>住所:</strong> {address}</p>
        <p><strong>連絡先携帯番号:</strong> {phone}</p>
        <p><strong>Eメール:</strong> {email}</p>
        {coupon && <p><strong>クーポン:</strong> {coupon}</p>}
        <p className={styles.price}><strong>合計金額:</strong> ¥{parseInt(totalPrice).toLocaleString()}</p>
      </div>

      <div className={styles.paymentForm}>
        <h2>お支払い情報</h2>
        {/* Dummy payment form */}
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber">カード番号</label>
          <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="expiryDate">有効期限</label>
          <input type="text" id="expiryDate" placeholder="MM/YY" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="123" />
        </div>
        <button onClick={handlePayment} className={styles.payButton}>支払う</button>
      </div>
    </div>
  );
}
