
'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import styles from '../booking.module.css';
import Login from '../Login';
import Register from '../Register';
import { dummyCars } from '../../../lib/dummyData';

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const carId = params.carId;
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const selectedOptions = JSON.parse(searchParams.get('selectedOptions') || '[]');
  const basePrice = searchParams.get('basePrice');
  const optionsPrice = searchParams.get('optionsPrice');
  const tax = searchParams.get('tax');
  const totalPrice = searchParams.get('totalPrice');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const car = dummyCars.find(c => c.id === parseInt(carId));

  const handleLogin = (userData) => {
    setName(userData.username);
    setIsMember(true);
    setShowLogin(false);
  };

  const handleRegister = (userData) => {
    setName(userData.name);
    setAddress(userData.address);
    setPhone(userData.phone);
    setEmail(userData.email);
    setIsMember(true);
    setShowRegister(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('利用規約に同意してください。');
      return;
    }
    
    const bookingDetails = {
      carId,
      pickupDate,
      returnDate,
      selectedOptions: JSON.stringify(selectedOptions),
      basePrice,
      optionsPrice,
      tax,
      totalPrice,
      name,
      address,
      phone,
      email,
      coupon,
    };

    const queryString = new URLSearchParams(bookingDetails).toString();
    router.push(`/booking/payment?${queryString}`);
  };

  return (
    <div className={styles.container}>
      <h1>予約フォーム</h1>

      {car && (
         <div className={styles.priceDetails}>
         <h2>料金内訳</h2>
         <p>本体価格: ¥{parseInt(basePrice).toLocaleString()}</p>
         <p>オプション料金: ¥{parseInt(optionsPrice).toLocaleString()}</p>
         <p>消費税 (10%): ¥{parseInt(tax).toLocaleString()}</p>
         <hr />
         <p className={styles.totalPrice}>合計金額: ¥{parseInt(totalPrice).toLocaleString()}</p>
       </div>
      )}

      <div className={styles.memberSection}>
        <h2>メンバー</h2>
        {!isMember && (
          <div className={styles.memberActions}>
            <button onClick={() => { setShowLogin(true); setShowRegister(false); }} className={styles.memberButton}>ログイン</button>
            <button onClick={() => { setShowRegister(true); setShowLogin(false); }} className={styles.memberButton}>新規登録</button>
          </div>
        )}

        {showLogin && <Login onLogin={handleLogin} />}
        {showRegister && <Register onRegister={handleRegister} />}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>顧客情報入力</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">氏名</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">住所</label>
          <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">連絡先携帯番号</label>
          <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Eメール</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        
        <h2>クーポンコード</h2>
        <div className={styles.formGroup}>
          <label htmlFor="coupon">クーポンコード</label>
          <input id="coupon" type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
        </div>

        <div className={styles.checkboxGroup}>
          <input id="agreed" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <label htmlFor="agreed">利用規約に同意します</label>
        </div>

        <button type="submit" className={styles.submitButton} disabled={!agreed}>
          決済画面へ進む
        </button>
      </form>
    </div>
  );
}
