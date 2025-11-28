'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './complete.module.css';
import { CheckCircleIcon, KeyIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Firebase
import { db } from '../../../lib/firebase'; // Corrected path
import { doc, getDoc } from 'firebase/firestore';

export default function CompletePage() {
  const router = useRouter();
  const params = useParams();
  const { bookingId } = params;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // For demo purposes, generate a random PIN. 
  // In a real app, this would come from your backend/key system.
  const [keyPin] = useState(Math.floor(1000 + Math.random() * 9000).toString());

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const bookingRef = doc(db, 'bookings', bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (bookingSnap.exists()) {
          setBooking(bookingSnap.data());
        } else {
          setError('予約情報が見つかりませんでした。');
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError('情報の取得中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <div className={styles.loadingState}>読み込み中...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.completeBox}>
        <div className={styles.header}>
          <CheckCircleIcon className={styles.successIcon} />
          <h1 className={styles.title}>チェックイン完了</h1>
          <p className={styles.subtitle}>
            ご準備ができました。安全運転でいってらっしゃい！
          </p>
        </div>

        <div className={styles.pinSection}>
            <h2 className={styles.pinTitle}>キーボックスの暗証番号</h2>
            <div className={styles.pinCodeBox}>
                <KeyIcon className="h-8 w-8 text-yellow-500" />
                <span className={styles.pinCode}>{keyPin}</span>
            </div>
            <p className={styles.pinInfo}>車両指定のキーボックスにこの番号を入力し、キーを取り出してください。</p>
        </div>

        {booking && (
          <div className={styles.bookingDetails}>
            <h3 className={styles.detailsTitle}>ご予約内容</h3>
            <ul>
              <li><strong>車両:</strong> {booking.carName}</li>
              <li><strong>ナンバー:</strong> {booking.licensePlate}</li>
              <li><strong>お名前:</strong> {booking.driverName || '登録されていません'}</li>
            </ul>
          </div>
        )}

        <Link href="/" legacyBehavior>
            <a className={styles.homeButton}>
                <ArrowUturnLeftIcon className="h-5 w-5" />
                <span>トップページに戻る</span>
            </a>
        </Link>

      </div>
    </div>
  );
}
