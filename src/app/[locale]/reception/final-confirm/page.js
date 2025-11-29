
'use client'

import { useRouter } from 'next/navigation';
import styles from './final-confirm.module.css';

export default function FinalConfirmPage() {
  const router = useRouter();

  // Dummy data reflecting final choices
  const finalBookingDetails = {
    drivers: [
      { name: '山田 太郎', licenseNumber: '123456789012' },
      { name: '山田 花子', licenseNumber: '987654321098' },
    ],
    car: {
      name: 'トヨタ・クラウン',
      class: 'セダン',
    },
    rentalPeriod: {
      pickup: '2024-07-28 10:00',
      return: '2024-07-29 18:00',
    },
    options: ['チャイルドシート', 'カーナビ'],
    nocEnrollment: true,
    finalCost: {
      base: 5000,
      options: 1500, // 1000 + 500
      upgrade: 3000,
      noc: 550,
      total: 10050,
    },
  };

  const handleConfirm = () => {
    // In a real app, this would trigger the payment process and finalize the booking
    alert('ご契約ありがとうございます！');
    router.push('/reception/complete');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>最終契約内容確認</h1>

      <div className={styles.section}>
        <h2>ご契約内容</h2>
        <p><strong>車両:</strong> {finalBookingDetails.car.name} ({finalBookingDetails.car.class})</p>
        <p><strong>期間:</strong> {finalBookingDetails.rentalPeriod.pickup} 〜 {finalBookingDetails.rentalPeriod.return}</p>
      </div>

      <div className={styles.section}>
        <h2>運転者様</h2>
        <ul>
          {finalBookingDetails.drivers.map((driver, index) => (
            <li key={index}>{driver.name}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>オプション・補償</h2>
        <ul>
          {finalBookingDetails.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <p>{finalBookingDetails.nocEnrollment ? 'NOC補償に加入' : 'NOC補償に未加入'}</p>
      </div>

      <div className={`${styles.section} ${styles.totalSection}`}>
        <h2>お支払い予定額</h2>
        <p>基本料金: ¥{finalBookingDetails.finalCost.base.toLocaleString()}</p>
        <p>オプション料金: ¥{finalBookingDetails.finalCost.options.toLocaleString()}</p>
        <p>アップグレード料金: ¥{finalBookingDetails.finalCost.upgrade.toLocaleString()}</p>
        <p>NOC補償: ¥{finalBookingDetails.finalCost.noc.toLocaleString()}</p>
        <hr />
        <p className={styles.totalAmount}>合計: ¥{finalBookingDetails.finalCost.total.toLocaleString()}</p>
      </div>

      <button onClick={handleConfirm} className={styles.confirmButton}>
        契約を確定し、支払いへ進む
      </button>
    </div>
  );
}
