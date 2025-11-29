'use client';

import { useState } from 'react';
import { seedDatabase } from '../../../../lib/seed'; // Corrected import path
import styles from './seed.module.css';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSeed = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const result = await seedDatabase();
      if (result.success) {
        setMessage(`データベースに ${result.count} 件の車両データを登録しました。`);
      } else {
        throw result.error || new Error('Seeding failed for an unknown reason.');
      }
    } catch (e) {
      console.error(e);
      setError(`データの登録に失敗しました。コンソールログを確認してください。: ${e.message}`)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.seedBox}>
        <h1 className={styles.title}>データベース初期化</h1>
        <p className={styles.description}>
          このページでは、Firestoreデータベースにサンプル車両データを登録できます。
          <br />
          <strong>注意：</strong> 既存のデータは上書きされる可能性があります。
        </p>
        <button
          onClick={handleSeed}
          className={styles.seedButton}
          disabled={loading}
        >
          {loading ? '登録中...' : 'サンプルデータを登録'}
        </button>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}
