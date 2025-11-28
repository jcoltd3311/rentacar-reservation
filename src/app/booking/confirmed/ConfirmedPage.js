
'use client'

import { useSearchParams } from 'next/navigation';
import styles from './confirmed.module.css';

export default function ConfirmedPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>予約完了</h1>
      <p className={styles.message}> {name} 様、ご予約ありがとうございます。</p>
      <p className={styles.message}>詳細はメールにてご確認ください。</p>
    </div>
  );
}
