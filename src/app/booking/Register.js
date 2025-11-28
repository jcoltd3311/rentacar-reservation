
'use client'

import { useState } from 'react';
import styles from './register.module.css';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    // Dummy registration logic
    onRegister({ name, address, phone, email });
  };

  return (
    <div className={styles.container}>
      <h2>新規会員登録</h2>
      <input type="text" placeholder="氏名" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
      <input type="text" placeholder="住所" value={address} onChange={(e) => setAddress(e.target.value)} className={styles.input} />
      <input type="tel" placeholder="連絡先携帯番号" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input} />
      <input type="email" placeholder="Eメール" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
      <button onClick={handleRegister} className={styles.button}>登録</button>
    </div>
  );
}
