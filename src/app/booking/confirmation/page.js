
"use client";
import React from 'react';
import Link from 'next/link';
import styles from './confirmation.module.css';

const ConfirmationPage = () => {
  // 実際のアプリケーションでは、予約IDをURLや状態管理から取得します
  const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className={styles.container}>
      <div className={styles.confirmationBox}>
        <h1 className={styles.title}>ご予約ありがとうございます！</h1>
        <p className={styles.message}>
          以下の内容でご予約を承りました。ご来店を心よりお待ちしております。
        </p>
        <div className={styles.details}>
          <p><strong>予約番号:</strong> {bookingId}</p>
          <p><strong>店舗連絡先:</strong> 012-345-6789</p>
          <p><strong>ご来店時の注意:</strong> 運転免許証を忘れずにお持ちください。</p>
        </div>
        <Link href="/" className={styles.homeButton}>
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
