
'use client'

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function HomePage() {
  const router = useRouter();

  const startReception = () => {
    // Prompt for password
    const password = prompt("受付担当者用のパスワードを入力してください");

    // Check if the password is correct
    if (password === "4649") {
      // If correct, proceed to the reception start page
      router.push('/reception/scan');
    } else {
      // If incorrect, show an alert
      alert("パスワードが違います。もう一度お試しください。");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.brand}>Cool Car Rentals</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>無人レンタカー受付システム</h2>
          <p className={styles.heroSubtitle}>ようこそ！簡単な手続きで、すぐに出発できます。</p>
        </div>

        <div className={styles.receptionButtonContainer}>
          <button onClick={startReception} className={styles.receptionButton}>
            ご予約済みの方はこちら（受付開始）
          </button>
        </div>
      </main>
    </div>
  );
}
