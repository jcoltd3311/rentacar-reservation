
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './scan.module.css';

export default function ScanPage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  // Clear localStorage on component mount for a fresh start
  useEffect(() => {
    localStorage.removeItem('drivers');
  }, []);

  const handleAddDriver = () => {
    if (name && address && licenseNumber) {
      const newDrivers = [...drivers, { name, address, licenseNumber }];
      setDrivers(newDrivers);
      setName('');
      setAddress('');
      setLicenseNumber('');
    } else {
      alert('すべての項目を入力してください。');
    }
  };

  const handleNext = () => {
    if (drivers.length > 0) {
      // Save drivers data to localStorage before moving to the next page
      localStorage.setItem('drivers', JSON.stringify(drivers));
      router.push('/reception/guide');
    } else {
      alert('少なくとも1人の運転者情報を入力してください。');
    }
  };

  return (
    <div className={styles.container}>
      <h1>免許証情報入力</h1>
      <p>免許証の情報を入力してください。（スキャンをシミュレート）</p>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">氏名</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">住所</label>
          <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="licenseNumber">免許証番号</label>
          <input id="licenseNumber" type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
        </div>
        <button onClick={handleAddDriver} className={styles.addButton}>運転者を追加</button>
      </div>

      <div className={styles.driverList}>
        <h2>登録済み運転者 ({drivers.length}名)</h2>
        {drivers.length === 0 ? (
          <p>まだ運転者情報が登録されていません。</p>
        ) : (
          <ul>
            {drivers.map((driver, index) => (
              <li key={index}>
                <strong>{index === 0 ? '代表者:' : `追加運転者 ${index}:`}</strong> {driver.name} ({driver.licenseNumber})
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleNext} className={styles.nextButton} disabled={drivers.length === 0}>
        次へ進む
      </button>
    </div>
  );
}
