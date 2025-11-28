
"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './disclaimer.module.css';

const DisclaimerPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const handleNext = () => {
    // 同意したという情報を次のステップに渡すこともできます
    router.push(`/reception/vehicle-check?bookingId=${bookingId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.title}>免責事項と補償制度のご説明</h1>
        <div className={styles.textContent}>
          <h2>免責補償制度（任意加入）</h2>
          <p>ご加入されますと、万一の事故の際に警察および当社の所定の手続きをお取りいただければ、免責額が免除されます。</p>
          <h2>ワイド補償（任意加入）</h2>
          <p>免責補償制度に加え、ご加入されますと、ノンオペレーションチャージ(NOC)の支払いが免除されます。</p>
          <h2>注意事項</h2>
          <p>...</p>
          {/* ここに詳細な説明を追加 */}
        </div>
        <div className={styles.actions}>
            <button onClick={handleNext} className={styles.nextButton}>
              内容を理解し、次へ進む
            </button>
        </div>
      </div>
    </div>
  );
};

const DisclaimerPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <DisclaimerPageContent />
    </Suspense>
);

export default DisclaimerPage;
