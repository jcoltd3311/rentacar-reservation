
"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './complete.module.css';

const CompletePageContent = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className={styles.container}>
      <div className={styles.completeBox}>
        <h1 className={styles.title}>受付が完了しました！</h1>
        <p className={styles.message}>
          ご予約番号 <strong>{bookingId}</strong> の貸渡手続きが完了しました。
        </p>
        <p className={styles.message}>
          お気をつけていってらっしゃいませ！
        </p>
        <Link href="/" className={styles.homeButton}>
          トップページへ
        </Link>
      </div>
    </div>
  );
};

const CompletePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CompletePageContent />
  </Suspense>
);

export default CompletePage;
