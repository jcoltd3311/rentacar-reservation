
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './confirm.module.css';

export default function ConfirmPage() {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Retrieve driver data from localStorage
    const storedDrivers = JSON.parse(localStorage.getItem('drivers') || '[]');

    // In a real app, car info, rental period, and costs would also be passed from previous steps
    // Here we'll merge the stored drivers with some realistic dummy data
    setBookingDetails({
      drivers: storedDrivers.length > 0 ? storedDrivers : [{ name: 'データなし', licenseNumber: '---' }],
      car: {
        name: 'トヨタ・ヤリス',
        class: 'コンパクト',
        number: 'わ 500 あ 1234',
      },
      rentalPeriod: {
        pickup: '2024-08-01 10:00',
        return: '2024-08-03 18:00',
      },
      options: {
        compensation: true, // 免責補償
        nocSupport: true,    // NOCサポート
        childSeat: false,
      },
      initialCost: {
        base: 18000,
        compensationFee: 2200, // 免責補償料
        nocSupportFee: 1100, // NOCサポート料
        options: 0,
        total: 21300,
      },
    });
  }, []);

  const handleNext = () => {
    router.push('/reception/signature');
  };

  if (!bookingDetails) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ご契約内容の最終確認</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>運転者情報</h2>
        <ul className={styles.driverList}>
          {bookingDetails.drivers.map((driver, index) => (
            <li key={index}>
              <span className={styles.driverRole}>{index === 0 ? '代表運転者' : `追加運転者 ${index}`}</span>
              <span className={styles.driverName}>{driver.name} 様</span>
              <span className={styles.licenseNumber}>免許証番号: {driver.licenseNumber}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>車両情報</h2>
        <p><strong>車種:</strong> {bookingDetails.car.name} ({bookingDetails.car.class})</p>
        <p><strong>ナンバー:</strong> {bookingDetails.car.number}</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>ご利用期間</h2>
        <p><strong>貸出日時:</strong> {bookingDetails.rentalPeriod.pickup}</p>
        <p><strong>返却日時:</strong> {bookingDetails.rentalPeriod.return}</p>
      </div>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>オプション</h2>
        <ul className={styles.optionList}>
            <li>免責補償: {bookingDetails.options.compensation ? '加入' : '未加入'}</li>
            <li>NOCサポート: {bookingDetails.options.nocSupport ? '加入' : '未加入'}</li>
            <li>チャイルドシート: {bookingDetails.options.childSeat ? 'あり' : 'なし'}</li>
        </ul>
      </div>

      <div className={`${styles.section} ${styles.costSection}`}>
        <h2 className={styles.sectionTitle}>概算料金</h2>
        <div className={styles.costGrid}>
            <p>基本料金:</p> <p>¥{bookingDetails.initialCost.base.toLocaleString()}</p>
            <p>免責補償料:</p> <p>¥{bookingDetails.initialCost.compensationFee.toLocaleString()}</p>
            <p>NOCサポート料:</p> <p>¥{bookingDetails.initialCost.nocSupportFee.toLocaleString()}</p>
            <p>その他オプション:</p> <p>¥{bookingDetails.initialCost.options.toLocaleString()}</p>
            <p className={styles.totalLabel}>合計 (税込):</p> <p className={styles.totalAmount}>¥{bookingDetails.initialCost.total.toLocaleString()}</p>
        </div>
      </div>

      <button onClick={handleNext} className={styles.nextButton}>
        内容に同意し、署名へ進む
      </button>
    </div>
  );
}
